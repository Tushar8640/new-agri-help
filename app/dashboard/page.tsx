'use client';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          ড্যাশবোর্ড
        </h1>
        <p className="text-muted-foreground">
          কৃষিমিত্রে স্বাগতম
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">মোট জমি</h3>
          <p className="text-2xl font-bold mt-2">০ বিঘা</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">সক্রিয় ফসল</h3>
          <p className="text-2xl font-bold mt-2">০</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">মোট খরচ</h3>
          <p className="text-2xl font-bold mt-2">৳০</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">মোট ফলন</h3>
          <p className="text-2xl font-bold mt-2">০ কেজি</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">আজকের বাজার দর</h2>
          <p className="text-sm text-muted-foreground">শীঘ্রই আসছে...</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">সম্প্রদায় থেকে</h2>
          <p className="text-sm text-muted-foreground">শীঘ্রই আসছে...</p>
        </div>
      </div>
    </div>
  );
}
