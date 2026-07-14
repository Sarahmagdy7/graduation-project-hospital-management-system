# Hospital Backend API

## خطوات التشغيل

1. ثبّت الـ packages:
   npm install

2. انسخ ملف البيئة:
   cp .env.example .env
   (ثم عدّل DATABASE_URL بمعلومات قاعدة البيانات)

3. أنشئ الجداول في قاعدة البيانات:
   psql $DATABASE_URL -f db/schema.sql

4. شغّل السيرفر:
   npm run dev

## الـ APIs المتاحة

| Method | Endpoint               | الوظيفة           |
|--------|------------------------|-------------------|
| GET    | /api/healthz           | فحص السيرفر       |
| POST   | /api/auth/login        | تسجيل الدخول      |
| GET    | /api/dashboard/stats   | إحصائيات         |
| GET    | /api/patients          | جلب المرضى        |
| POST   | /api/patients          | إضافة مريض        |
| PUT    | /api/patients/:id      | تعديل مريض        |
| DELETE | /api/patients/:id      | حذف مريض          |
| GET    | /api/appointments      | المواعيد          |
| POST   | /api/appointments      | إضافة موعد        |
| PUT    | /api/appointments/:id  | تعديل موعد        |
| DELETE | /api/appointments/:id  | حذف موعد          |
| GET    | /api/staff             | الموظفين          |
| POST   | /api/staff             | إضافة موظف        |
| PUT    | /api/staff/:id         | تعديل موظف        |
| DELETE | /api/staff/:id         | حذف موظف          |
| GET    | /api/medicines         | الأدوية           |
| POST   | /api/medicines         | إضافة دواء        |
| PUT    | /api/medicines/:id     | تعديل دواء        |
| DELETE | /api/medicines/:id     | حذف دواء          |
| GET    | /api/lab               | تقارير المعمل     |
| POST   | /api/lab               | إضافة تقرير       |
| PUT    | /api/lab/:id           | تعديل تقرير       |
| DELETE | /api/lab/:id           | حذف تقرير         |
| GET    | /api/invoices          | الفواتير          |
| POST   | /api/invoices          | إضافة فاتورة      |
| DELETE | /api/invoices/:id      | حذف فاتورة        |
| GET    | /api/doctors           | الأطباء           |
| DELETE | /api/doctors/:id       | حذف طبيب          |

## بيانات الدخول التجريبية
- Admin: admin@gmail.com / @@123
- Doctor: doctor@gmail.com / 45@@
