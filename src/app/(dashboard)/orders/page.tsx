import { CreateOrderForm } from '@/features/orders/components/create-order/create-order-form';

export default function OrdersPage() {
  return (
    <section>
      <div className="mb-10">
        <h2 className="mb-3 text-2xl font-bold text-slate-900">
          Crea una orden
        </h2>

        <p className="text-base text-slate-600">
          Dale una ventaja competitiva a tu negocio con entregas{' '}
          <strong>el mismo día</strong> y <strong>el día siguiente</strong> a
          nivel nacional.
        </p>
      </div>

      <CreateOrderForm />
    </section>
  );
}
