import lcddriver
import sys
import time

def read_multiline_input():
    """
    Lee un string multilínea de la entrada estándar en una sola llamada.
    Finaliza la entrada con Ctrl+D.
    """
    print("Introduce el texto Ctrl+D para finalizar")
    return sys.stdin.read()

def center_text(text, width=20):
    """Centra el texto en una línea de ancho especificado."""
    padding = (width - len(text)) // 2
    return " " * padding + text

def display_text(lcd, text):
    """
    Muestra el texto en la pantalla LCD dividiéndolo en líneas.
    Si supera el límite de caracteres por línea o el número de líneas, solicita al usuario que reescriba.
    """
    while True:
        lcd.lcd_clear()
        lines = text.split('\n')
        
        if len(lines) > 4:
            print(f"\nVaya! Has superado el número máximo de líneas ({len(lines)}/4). Vuelve a introducir el texto.")
            text = read_multiline_input()
            continue
        
        invalid_length = False
        for i, line in enumerate(lines):
            if len(line) > 20:
                print(f"\nVaya! Has superado el máximo de caracteres en la línea {i+1} ({len(line)}/20). Vuelve a introducir el texto.")
                invalid_length = True
                break
        
        if invalid_length:
            text = read_multiline_input()
            continue
        
        for i, line in enumerate(lines[:4]):
            lcd.lcd_display_string(center_text(line[:20]), i + 1)  # Máximo 20 caracteres por línea
        break

def main():
    lcd = lcddriver.lcd()
    lcd.lcd_clear()
    
    lcd.lcd_display_string(center_text("Bienvenido, Pau"), 1)
    time.sleep(2)
    lcd.lcd_clear()
    
    lcd.lcd_display_string(center_text("Inserte su texto"), 1)
    lcd.lcd_display_string(center_text("en la terminal."), 2)
    time.sleep(3)
    lcd.lcd_clear()

    lcd.lcd_display_string(center_text("Esperando..."), 2) 


    text = read_multiline_input()
    display_text(lcd, text)
    print("\nMostrando el texto insertado en la pantalla LCD.")

if __name__ == "__main__":
    main()

