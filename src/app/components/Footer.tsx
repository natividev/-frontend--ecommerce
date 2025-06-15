export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold mb-2">Contáctanos</h4>
          <p>WhatsApp: +503 1234-5678</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Categorías Populares</h4>
          <ul className="space-y-1">
            <li>Electrónica</li>
            <li>Ropa</li>
            <li>Hogar</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Servicio al Cliente</h4>
          <ul className="space-y-1">
            <li>FAQ</li>
            <li>Política de Privacidad</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
