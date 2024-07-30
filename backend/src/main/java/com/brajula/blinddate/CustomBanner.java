package com.brajula.blinddate;

import org.springframework.boot.Banner;
import org.springframework.core.env.Environment;

public class CustomBanner implements Banner {
    private static final String terminalTxtColor = "\u001B[38;2;255;209;102m";
    private static final String primaryColor = "\u001B[38;2;239;71;111m";
    private static final String secondaryColor = "\u001B[38;2;34;116;165m";

    private static final String BANNER =
            secondaryColor
                    + "\nSuper duper amazing development by\n"
                    + primaryColor
                    + " ____ ____ ____ ____ ____ ____ ____ \n"
                    + "||"
                    + terminalTxtColor
                    + "B"
                    + primaryColor
                    + " |||"
                    + terminalTxtColor
                    + "r"
                    + primaryColor
                    + " |||"
                    + terminalTxtColor
                    + "a"
                    + primaryColor
                    + " |||"
                    + terminalTxtColor
                    + "j"
                    + primaryColor
                    + " |||"
                    + terminalTxtColor
                    + "u"
                    + primaryColor
                    + " |||"
                    + terminalTxtColor
                    + "l"
                    + primaryColor
                    + " |||"
                    + terminalTxtColor
                    + "a"
                    + primaryColor
                    + " ||\n"
                    + "||__|||__|||__|||__|||__|||__|||__||\n"
                    + "|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|\n"
                    + secondaryColor
                    + "\nDon't forget to have fun!"
                    + terminalTxtColor;

    @Override
    public void printBanner(
            Environment environment, Class<?> sourceClass, java.io.PrintStream out) {
        out.println(BANNER);
    }
}
