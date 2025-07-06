import { NetlifyRouter, corsMiddleware, jsonBodyParser, errorHandlingMiddleware, json } from 'netlify-api-framework'

const router = new NetlifyRouter()

// Add global middleware  
router.use(corsMiddleware)
router.use(jsonBodyParser)
router.use(errorHandlingMiddleware)

// Define routes
router.get('/hello', async (req, context) => {
  return new Response(JSON.stringify({ 
    message: 'Hello World!',
    timestamp: new Date().toISOString()
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
})

// Public routes
router.get('/health', async (req, context) => {
  // Array of possible health statuses with their probabilities
  const healthStatuses = [
    { status: 'healthy', weight: 60 },      // 60% chance
    { status: 'warning', weight: 25 },      // 25% chance
    { status: 'degraded', weight: 10 },     // 10% chance
    { status: 'unhealthy', weight: 4 },     // 4% chance
    { status: 'error', weight: 1 }          // 1% chance
  ]
  
  // Calculate weighted random selection
  const totalWeight = healthStatuses.reduce((sum, item) => sum + item.weight, 0)
  let random = Math.random() * totalWeight
  
  let selectedStatus = 'healthy' // fallback
  for (const item of healthStatuses) {
    random -= item.weight
    if (random <= 0) {
      selectedStatus = item.status
      break
    }
  }
  
  // Additional status-specific data
  const statusData: Record<string, any> = {
    healthy: {
      uptime: '99.9%',
      responseTime: '15ms'
    },
    warning: {
      uptime: '99.5%',
      responseTime: '45ms',
      issues: ['High memory usage detected']
    },
    degraded: {
      uptime: '98.2%',
      responseTime: '120ms',
      issues: ['Database connection slow', 'High CPU usage']
    },
    unhealthy: {
      uptime: '95.1%',
      responseTime: '300ms',
      issues: ['Multiple service failures', 'Network connectivity issues']
    },
    error: {
      uptime: '89.0%',
      responseTime: 'timeout',
      issues: ['Critical system failure', 'Service unavailable']
    }
  }

  return json({ 
    status: selectedStatus,
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    ...statusData[selectedStatus]
  })
})

router.get('/hello/:name', async (req, context, params) => {
  return json({ 
    message: `Hello, ${params?.name}!`,
    timestamp: new Date().toISOString()
  })
})

// Export handler for Netlify
export const handler = router.handler()