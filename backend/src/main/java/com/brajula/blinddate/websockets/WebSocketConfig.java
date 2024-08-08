package com.brajula.blinddate.websockets;

import com.brajula.blinddate.Routes;
import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.entities.user.UserService;
import com.brajula.blinddate.exceptions.ForbiddenException;
import com.brajula.blinddate.security.JwtService;
import com.brajula.blinddate.security.TokenData;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.socket.config.annotation.*;

import java.util.Optional;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final UserService userService;
    private final JwtService jwtService;

    @Override
    public void configureMessageBroker(final MessageBrokerRegistry config) {
        config.enableSimpleBroker(Routes.CHATS);
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(final StompEndpointRegistry registry) {
        registry.addEndpoint("stomp");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(
                new ChannelInterceptor() {
                    @Override
                    public Message<?> preSend(Message<?> message, MessageChannel channel) {
                        StompHeaderAccessor accessor =
                                MessageHeaderAccessor.getAccessor(
                                        message, StompHeaderAccessor.class);

                        assert accessor != null;
                        if (StompCommand.CONNECT.equals(accessor.getCommand())) {

                            String authorizationHeader =
                                    accessor.getFirstNativeHeader("Authorization");
                            assert authorizationHeader != null;
                            String token = authorizationHeader.substring(7);

                            Optional<TokenData> possibleToken = jwtService.readToken(token);

                            String username =
                                    possibleToken.orElseThrow(ForbiddenException::new).username();
                            User user = userService.loadUserByUsername(username);
                            UsernamePasswordAuthenticationToken
                                    usernamePasswordAuthenticationToken =
                                            new UsernamePasswordAuthenticationToken(
                                                    user,
                                                    null,
                                                    user.getAuthorities());
                            SecurityContextHolder.getContext()
                                    .setAuthentication(usernamePasswordAuthenticationToken);

                            accessor.setUser(usernamePasswordAuthenticationToken);
                        }

                        return message;
                    }
                });
    }
}
