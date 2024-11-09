export default function DashboardCard({ title, value, description }) {
    return (
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-3xl font-bold mt-2">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    )
  }