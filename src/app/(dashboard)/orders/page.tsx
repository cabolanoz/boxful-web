export default function OrdersPage() {
  return (
    <section>
      <div className="mb-10">
        <h2 className="mb-3 text-2xl font-bold text-slate-900">
          Crea una orden
        </h2>

        <p className="text-base text-slate-600">
          Dale una ventaja competitiva a tu negocio con entregas{' '}
          <strong>el mismo día</strong> y <strong>el día siguiente</strong>.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8">
        <h3 className="mb-8 text-lg font-bold text-slate-900">
          Completa los datos
        </h3>

        <p className="text-slate-500">
          Aquí construiremos el formulario de creación de orden.
        </p>
      </div>
    </section>
  );
}
