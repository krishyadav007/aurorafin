import prisma from '@/lib/prisma'
import DashboardCard from '../components/dashboard-card'

export default async function AdminDashboard() {
  const stats = await getAdminStats()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Users"
          value={stats.totalUsers}
          description="Registered users"
        />
        <DashboardCard
          title="Active Users"
          value={stats.activeUsers}
          description="In last 30 days"
        />
        <DashboardCard
          title="New Users"
          value={stats.newUsers}
          description="This month"
        />
      </div>

      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {/* Add recent activity list here */}
      </div>
    </div>
  )
}

async function getAdminStats() {
  const [totalUsers, activeUsers, newUsers] = await Promise.all([
    prisma.user.count(),
    prisma.session.count({
      where: {
        expires: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    }),
    -1
    // prisma.user.count({
    //   where: {
    //     createdAt: {
    //       gte: new Date().setDate(1) // First day of current month
    //     }
    //   }
    // })
  ])

  return {
    totalUsers,
    activeUsers,
    newUsers
  }
}