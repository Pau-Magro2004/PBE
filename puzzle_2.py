import gi
gi.require_version("Gtk", "3.0")
from gi.repository import Gtk
import lcddriver

class LCDApp(Gtk.Window):
    def __init__(self):
        super().__init__(title="LCD Display")
        self.set_default_size(300, 200)

        self.lcd = lcddriver.lcd()
        self.lcd.lcd_clear()
        print("LCD inicializado")

        vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=6)
        self.add(vbox)

        self.textview = Gtk.TextView()
        vbox.pack_start(self.textview, True, True, 0)

        btn_display = Gtk.Button(label="Display")
        btn_display.connect("clicked", self.display_text)
        vbox.pack_start(btn_display, False, False, 0)

    def display_text(self, _):
        print("Botón presionado")
        buffer = self.textview.get_buffer()
        text = buffer.get_text(buffer.get_start_iter(), buffer.get_end_iter(), False).strip()
        lines = text.split("\n")[:4]  # Limita a 4 líneas

        print("Texto ingresado:", lines)

        self.lcd.lcd_clear()
        for i, line in enumerate(lines):
            self.lcd.lcd_display_string(line[:20], i + 1)  # Máximo 20 caracteres por línea
            print(f"Línea {i+1} en LCD: {line[:20]}")

        print("Texto mostrado en la pantalla LCD.")

app = LCDApp()
app.connect("destroy", Gtk.main_quit)
app.show_all()
Gtk.main()
