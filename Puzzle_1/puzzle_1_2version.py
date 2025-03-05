import lcddriver
import sys

def read_text():
    print("Introdueix el teu text i finalitza amb Ctrl+D:")
    text = sys.stdin.read().strip()
    return text.split("\n")[:4] 

def display_text(lcd, lines):
    lcd.lcd_clear()
    for i, line in enumerate(lines):
        lcd.lcd_display_string(line[:20], i + 1)

def main():
    lcd = lcddriver.lcd()
    lcd.lcd_clear()
    text_lines = read_text()
    display_text(lcd, text_lines)
    print("\nTexto mostrado en la pantalla LCD.")

if __name__ == "__main__":
    main()




