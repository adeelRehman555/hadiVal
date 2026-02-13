"use client"
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import confetti from 'canvas-confetti'

export default function HomePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem('isAuthenticated')
    if (auth !== 'true') {
      router.push('/login')
      return
    }
    setIsAuthenticated(true)
    
    // Get logged-in user's name
    const name = sessionStorage.getItem('userName') || ''
    setUserName(name.toLowerCase())
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated')
    sessionStorage.removeItem('userName')
    router.push('/login')
  }

  if (!isAuthenticated) {
    return null
  }

  // Render different pages based on user
  if (userName === 'iman') {
    return <ImanValentinePage onLogout={handleLogout} />
  } else if (userName === 'noor') {
    return <NoorPage onLogout={handleLogout} />
  } else if (userName === 'safia') {
    return <SafiaPage onLogout={handleLogout} />
  }

  return null
}

// Iman's Valentine Page
function ImanValentinePage({ onLogout }: { onLogout: () => void }) {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const [rejectionCount, setRejectionCount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const noButtonRef = useRef<HTMLButtonElement>(null)

  // Heart confetti on page load
  useEffect(() => {
    const duration = 4000 // 4 seconds
    const interval = 300 // Launch every 300ms
    let elapsed = 0
    
    const launchHeartConfetti = () => {
      const colors = ['#ff0a54', '#ff477e', '#ff5ca3', '#dc143c', '#c41e3a']
      
      // Left side hearts
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
        shapes: ['heart'],
        scalar: 1.2,
        gravity: 0.8,
        drift: 0.5,
        ticks: 200,
        zIndex: 9999
      } as any)
      
      // Right side hearts
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
        shapes: ['heart'],
        scalar: 1.2,
        gravity: 0.8,
        drift: -0.5,
        ticks: 200,
        zIndex: 9999
      } as any)
      
      // Center burst
      confetti({
        particleCount: 5,
        angle: 90,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
        shapes: ['heart'],
        scalar: 1.5,
        gravity: 0.6,
        ticks: 250,
        zIndex: 9999
      } as any)
    }

    // Launch immediately
    launchHeartConfetti()
    
    // Continue launching
    const intervalId = setInterval(() => {
      elapsed += interval
      if (elapsed >= duration) {
        clearInterval(intervalId)
        return
      }
      launchHeartConfetti()
    }, interval)

    return () => clearInterval(intervalId)
  }, [])

  const rejectionMessages = [
    "Mann jao na Yr 🥺",
    "Please Ban jao mera valentine 💕",
    "Ek chance toh do 🌹",
    "Soch lo dobara ❤️",
    "Please yaar 🥹",
    "Itna bhi bura nahi hoon 😊",
    "Last time puch raha hoon 💝",
    "Pakka promise karenge khush rakhenge 🌟"
  ]

  const moveNoButton = () => {
    const container = document.getElementById('button-container')
    if (!container || !noButtonRef.current) return

    const containerRect = container.getBoundingClientRect()
    const buttonRect = noButtonRef.current.getBoundingClientRect()

    const maxX = containerRect.width - buttonRect.width - 20
    const maxY = containerRect.height - buttonRect.height - 20

    const newX = Math.random() * maxX
    const newY = Math.random() * maxY

    setNoButtonPos({ x: newX, y: newY })
    setRejectionCount(prev => prev + 1)
  }

  const handleYes = () => {
    setShowSuccess(true)
    // Launch celebration confetti
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0a54', '#ff477e', '#ff5ca3']
      })
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0a54', '#ff477e', '#ff5ca3']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a0a0f 0%, #2d0a1f 50%, #1a0a0f 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.05); }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(255, 10, 84, 0.7)); }
          50% { filter: drop-shadow(0 0 20px rgba(255, 10, 84, 1)); }
        }
      `}</style>

      {/* Floating hearts background */}
      {[...Array(25)].map((_, i) => {
        const delay = (i * 2) % 12
        const duration = 12 + (i % 6)
        const left = `${(i * 4) % 100}%`
        const size = 20 + (i % 4) * 10
        return (
          <div
            key={i}
            style={{
              position: 'fixed',
              bottom: '-10%',
              left,
              animation: `float ${duration}s linear ${delay}s infinite`,
              fontSize: `${size}px`,
              pointerEvents: 'none',
              willChange: 'transform',
              filter: 'drop-shadow(0 0 8px rgba(255, 10, 84, 0.6))'
            }}
          >
            {i % 3 === 0 ? '❤️' : i % 3 === 1 ? '💕' : '💖'}
          </div>
        )
      })}

      {/* Logout Button */}
      <button
        onClick={onLogout}
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          padding: '0.75rem 1.5rem',
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '2px solid rgba(255, 10, 84, 0.5)',
          color: '#ff0a54',
          fontWeight: 600,
          fontSize: '0.875rem',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          zIndex: 100
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#ff0a54'
          e.currentTarget.style.color = '#fff'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
          e.currentTarget.style.color = '#ff0a54'
        }}
      >
        Logout
      </button>

      <div style={{
        maxWidth: '800px',
        width: '100%',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(255, 245, 250, 0.95))',
          borderRadius: '2rem',
          padding: 'clamp(2rem, 5vw, 3rem)',
          boxShadow: '0 50px 100px rgba(255, 10, 84, 0.4), 0 0 0 3px rgba(255, 10, 84, 0.3)',
          border: '3px solid transparent',
          backgroundImage: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(255, 245, 250, 0.95)), linear-gradient(135deg, #ff0a54, #ff477e, #ff0a54)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          position: 'relative'
        }}>
          {/* Top heart decoration */}
          <div style={{
            position: 'absolute',
            top: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(3rem, 8vw, 4rem)',
            animation: 'heartbeat 1.5s ease-in-out infinite, glow 2s ease-in-out infinite'
          }}>
            💖
          </div>

          {/* Photo */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
            marginTop: '1.5rem'
          }}>
            <div style={{
              position: 'relative',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(255, 10, 84, 0.4)',
              border: '4px solid',
              borderImage: 'linear-gradient(135deg, #ff0a54, #ff477e, #ff5ca3) 1',
              maxWidth: '300px',
              width: '100%',
              aspectRatio: '1/1'
            }}>
              <Image src="/img11.jpeg" alt="Iman" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 4rem)',
            fontFamily: '"Great Vibes", cursive',
            background: 'linear-gradient(135deg, #ff0a54 0%, #c41e3a 50%, #8b0000 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            marginBottom: '1.5rem',
            filter: 'drop-shadow(0 2px 8px rgba(255, 10, 84, 0.3))'
          }}>
            Dear Iman 💕
          </h1>

          {/* Message */}
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
            lineHeight: '1.8',
            color: '#2d2d2d',
            textAlign: 'center',
            marginBottom: '2rem',
            fontWeight: 500,
            padding: '0 1rem'
          }}>
            This Valentine's Day, I want you to know how special you are to me. Your smile brightens my darkest days, and your presence makes everything beautiful. You're not just amazing – you're extraordinary! ❤️
          </p>

          {/* Question */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 10, 84, 0.08), rgba(196, 30, 58, 0.12))',
            borderRadius: '1.5rem',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '2rem',
            border: '2px solid rgba(255, 10, 84, 0.2)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              color: '#ff0a54',
              marginBottom: '1rem',
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(255, 10, 84, 0.2)'
            }}>
              Will You Be My Valentine? 💝
            </h2>

            {/* Rejection messages */}
            {rejectionCount > 0 && rejectionCount < 8 && (
              <p style={{
                fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                color: '#c41e3a',
                marginBottom: '1.5rem',
                fontWeight: 600,
                animation: 'heartbeat 0.5s ease-in-out'
              }}>
                {rejectionMessages[rejectionCount - 1]}
              </p>
            )}

            {rejectionCount >= 8 && (
              <p style={{
                fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                color: '#8b0000',
                marginBottom: '1.5rem',
                fontWeight: 700,
                animation: 'heartbeat 0.5s ease-in-out'
              }}>
                Bas ab toh haan bol do! Kitna tadpaogi? 😭💔
              </p>
            )}

            {/* Buttons */}
            <div
              id="button-container"
              style={{
                position: 'relative',
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap',
                padding: '1rem'
              }}
            >
              {/* Yes Button */}
              <button
                onClick={handleYes}
                style={{
                  padding: 'clamp(1rem, 3vw, 1.25rem) clamp(2rem, 5vw, 3rem)',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #ff0a54, #c41e3a)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(255, 10, 84, 0.5), 0 0 0 3px rgba(255, 255, 255, 0.3) inset',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(255, 10, 84, 0.7), 0 0 0 4px rgba(255, 255, 255, 0.4) inset'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 10, 84, 0.5), 0 0 0 3px rgba(255, 255, 255, 0.3) inset'
                }}
              >
                Yes! 💖
              </button>

              {/* No Button - Uncatchable */}
              <button
                ref={noButtonRef}
                onMouseEnter={moveNoButton}
                onTouchStart={(e) => {
                  e.preventDefault()
                  moveNoButton()
                }}
                onClick={(e) => {
                  e.preventDefault()
                  moveNoButton()
                }}
                style={{
                  position: rejectionCount > 0 ? 'absolute' : 'relative',
                  left: rejectionCount > 0 ? `${noButtonPos.x}px` : 'auto',
                  top: rejectionCount > 0 ? `${noButtonPos.y}px` : 'auto',
                  padding: 'clamp(1rem, 3vw, 1.25rem) clamp(2rem, 5vw, 3rem)',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  transition: rejectionCount > 0 ? 'all 0.3s ease' : 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  userSelect: 'none'
                }}
              >
                No 💔
              </button>
            </div>
          </div>

          {/* Bottom decoration */}
          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            color: '#888',
            fontStyle: 'italic'
          }}>
            Made with love, just for you ❤️
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'linear-gradient(145deg, #fff, #fff5f7)',
            borderRadius: '2rem',
            padding: 'clamp(2rem, 5vw, 3rem)',
            maxWidth: '500px',
            textAlign: 'center',
            boxShadow: '0 50px 100px rgba(255, 10, 84, 0.6)',
            border: '3px solid #ff0a54',
            animation: 'heartbeat 1s ease-in-out infinite'
          }}>
            <div style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', marginBottom: '1rem' }}>
              🎉💖🎊
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontFamily: '"Great Vibes", cursive',
              color: '#ff0a54',
              marginBottom: '1rem'
            }}>
              Yayy! You Said Yes!
            </h2>
            <p style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              color: '#2d2d2d',
              lineHeight: '1.6',
              marginBottom: '2rem',
              fontWeight: 500
            }}>
              This is the best Valentine's Day ever! Thank you for making me the happiest person alive! 💕✨
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              style={{
                padding: '1rem 2.5rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #ff0a54, #c41e3a)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(255, 10, 84, 0.5)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Close 💝
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Noor's Valentine Page
function NoorPage({ onLogout }: { onLogout: () => void }) {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const [rejectionCount, setRejectionCount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const noButtonRef = useRef<HTMLButtonElement>(null)

  // Heart confetti on page load
  useEffect(() => {
    const duration = 4000 // 4 seconds
    const interval = 300 // Launch every 300ms
    let elapsed = 0
    
    const launchHeartConfetti = () => {
      const colors = ['#667eea', '#764ba2', '#9f7aea', '#8b5cf6', '#a78bfa']
      
      // Left side hearts
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
        shapes: ['heart'],
        scalar: 1.2,
        gravity: 0.8,
        drift: 0.5,
        ticks: 200,
        zIndex: 9999
      } as any)
      
      // Right side hearts
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
        shapes: ['heart'],
        scalar: 1.2,
        gravity: 0.8,
        drift: -0.5,
        ticks: 200,
        zIndex: 9999
      } as any)
      
      // Center burst
      confetti({
        particleCount: 5,
        angle: 90,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
        shapes: ['heart'],
        scalar: 1.5,
        gravity: 0.6,
        ticks: 250,
        zIndex: 9999
      } as any)
    }

    // Launch immediately
    launchHeartConfetti()
    
    // Continue launching
    const intervalId = setInterval(() => {
      elapsed += interval
      if (elapsed >= duration) {
        clearInterval(intervalId)
        return
      }
      launchHeartConfetti()
    }, interval)

    return () => clearInterval(intervalId)
  }, [])

  const rejectionMessages = [
    "Mann jao na Yr 🥺",
    "Please Ban jao mera valentine 💕",
    "Ek chance toh do 🌹",
    "Soch lo dobara ❤️",
    "Please yaar 🥹",
    "Itna bhi bura nahi hoon 😊",
    "Last time puch raha hoon 💝",
    "Pakka promise karenge khush rakhenge 🌟"
  ]

  const moveNoButton = () => {
    const container = document.getElementById('button-container-noor')
    if (!container || !noButtonRef.current) return

    const containerRect = container.getBoundingClientRect()
    const buttonRect = noButtonRef.current.getBoundingClientRect()

    const maxX = containerRect.width - buttonRect.width - 20
    const maxY = containerRect.height - buttonRect.height - 20

    const newX = Math.random() * maxX
    const newY = Math.random() * maxY

    setNoButtonPos({ x: newX, y: newY })
    setRejectionCount(prev => prev + 1)
  }

  const handleYes = () => {
    setShowSuccess(true)
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#667eea', '#764ba2', '#9f7aea']
      })
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#667eea', '#764ba2', '#9f7aea']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1a4e 50%, #1a0a2e 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.05); }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.7)); }
          50% { filter: drop-shadow(0 0 20px rgba(102, 126, 234, 1)); }
        }
      `}</style>

      {/* Floating hearts background */}
      {[...Array(25)].map((_, i) => {
        const delay = (i * 2) % 12
        const duration = 12 + (i % 6)
        const left = `${(i * 4) % 100}%`
        const size = 20 + (i % 4) * 10
        return (
          <div
            key={i}
            style={{
              position: 'fixed',
              bottom: '-10%',
              left,
              animation: `float ${duration}s linear ${delay}s infinite`,
              fontSize: `${size}px`,
              pointerEvents: 'none',
              willChange: 'transform',
              filter: 'drop-shadow(0 0 8px rgba(102, 126, 234, 0.6))'
            }}
          >
            {i % 3 === 0 ? '💜' : i % 3 === 1 ? '💕' : '💖'}
          </div>
        )
      })}

      {/* Logout Button */}
      <button
        onClick={onLogout}
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          padding: '0.75rem 1.5rem',
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '2px solid rgba(102, 126, 234, 0.5)',
          color: '#667eea',
          fontWeight: 600,
          fontSize: '0.875rem',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          zIndex: 100
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#667eea'
          e.currentTarget.style.color = '#fff'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
          e.currentTarget.style.color = '#667eea'
        }}
      >
        Logout
      </button>

      <div style={{
        maxWidth: '800px',
        width: '100%',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(245, 245, 255, 0.95))',
          borderRadius: '2rem',
          padding: 'clamp(2rem, 5vw, 3rem)',
          boxShadow: '0 50px 100px rgba(102, 126, 234, 0.4), 0 0 0 3px rgba(102, 126, 234, 0.3)',
          border: '3px solid transparent',
          backgroundImage: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(245, 245, 255, 0.95)), linear-gradient(135deg, #667eea, #764ba2, #667eea)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          position: 'relative'
        }}>
          {/* Top heart decoration */}
          <div style={{
            position: 'absolute',
            top: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(3rem, 8vw, 4rem)',
            animation: 'heartbeat 1.5s ease-in-out infinite, glow 2s ease-in-out infinite'
          }}>
            💜
          </div>

          {/* Photo */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
            marginTop: '1.5rem'
          }}>
            <div style={{
              position: 'relative',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)',
              border: '4px solid',
              borderImage: 'linear-gradient(135deg, #667eea, #764ba2, #9f7aea) 1',
              maxWidth: '300px',
              width: '100%',
              aspectRatio: '1/1'
            }}>
              <Image src="/img22.jpeg" alt="Noor" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 4rem)',
            fontFamily: '"Great Vibes", cursive',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #5a67d8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            marginBottom: '1.5rem',
            filter: 'drop-shadow(0 2px 8px rgba(102, 126, 234, 0.3))'
          }}>
            Dear Noor 💕
          </h1>

          {/* Message */}
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
            lineHeight: '1.8',
            color: '#2d2d2d',
            textAlign: 'center',
            marginBottom: '2rem',
            fontWeight: 500,
            padding: '0 1rem'
          }}>
            This Valentine's Day, I want you to know how special you are to me. Your smile brightens my darkest days, and your presence makes everything beautiful. You're not just amazing – you're extraordinary! ❤️
          </p>

          {/* Question */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.12))',
            borderRadius: '1.5rem',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '2rem',
            border: '2px solid rgba(102, 126, 234, 0.2)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              color: '#667eea',
              marginBottom: '1rem',
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(102, 126, 234, 0.2)'
            }}>
              Will You Be My Valentine? 💝
            </h2>

            {/* Rejection messages */}
            {rejectionCount > 0 && rejectionCount < 8 && (
              <p style={{
                fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                color: '#764ba2',
                marginBottom: '1.5rem',
                fontWeight: 600,
                animation: 'heartbeat 0.5s ease-in-out'
              }}>
                {rejectionMessages[rejectionCount - 1]}
              </p>
            )}

            {rejectionCount >= 8 && (
              <p style={{
                fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                color: '#5a67d8',
                marginBottom: '1.5rem',
                fontWeight: 700,
                animation: 'heartbeat 0.5s ease-in-out'
              }}>
                Bas ab toh haan bol do! Kitna tadpaogi? 😭💔
              </p>
            )}

            {/* Buttons */}
            <div
              id="button-container-noor"
              style={{
                position: 'relative',
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap',
                padding: '1rem'
              }}
            >
              {/* Yes Button */}
              <button
                onClick={handleYes}
                style={{
                  padding: 'clamp(1rem, 3vw, 1.25rem) clamp(2rem, 5vw, 3rem)',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.5), 0 0 0 3px rgba(255, 255, 255, 0.3) inset',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.7), 0 0 0 4px rgba(255, 255, 255, 0.4) inset'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.5), 0 0 0 3px rgba(255, 255, 255, 0.3) inset'
                }}
              >
                Yes! 💖
              </button>

              {/* No Button - Uncatchable */}
              <button
                ref={noButtonRef}
                onMouseEnter={moveNoButton}
                onTouchStart={(e) => {
                  e.preventDefault()
                  moveNoButton()
                }}
                onClick={(e) => {
                  e.preventDefault()
                  moveNoButton()
                }}
                style={{
                  position: rejectionCount > 0 ? 'absolute' : 'relative',
                  left: rejectionCount > 0 ? `${noButtonPos.x}px` : 'auto',
                  top: rejectionCount > 0 ? `${noButtonPos.y}px` : 'auto',
                  padding: 'clamp(1rem, 3vw, 1.25rem) clamp(2rem, 5vw, 3rem)',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  transition: rejectionCount > 0 ? 'all 0.3s ease' : 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  userSelect: 'none'
                }}
              >
                No 💔
              </button>
            </div>
          </div>

          {/* Bottom decoration */}
          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            color: '#888',
            fontStyle: 'italic'
          }}>
            Made with love, just for you ❤️
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'linear-gradient(145deg, #fff, #f5f5ff)',
            borderRadius: '2rem',
            padding: 'clamp(2rem, 5vw, 3rem)',
            maxWidth: '500px',
            textAlign: 'center',
            boxShadow: '0 50px 100px rgba(102, 126, 234, 0.6)',
            border: '3px solid #667eea',
            animation: 'heartbeat 1s ease-in-out infinite'
          }}>
            <div style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', marginBottom: '1rem' }}>
              🎉💜🎊
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontFamily: '"Great Vibes", cursive',
              color: '#667eea',
              marginBottom: '1rem'
            }}>
              Yayy! You Said Yes!
            </h2>
            <p style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              color: '#2d2d2d',
              lineHeight: '1.6',
              marginBottom: '2rem',
              fontWeight: 500
            }}>
              This is the best Valentine's Day ever! Thank you for making me the happiest person alive! 💕✨
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              style={{
                padding: '1rem 2.5rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.5)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Close 💝
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Safia's Valentine Page
function SafiaPage({ onLogout }: { onLogout: () => void }) {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const [rejectionCount, setRejectionCount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const noButtonRef = useRef<HTMLButtonElement>(null)

  // Heart confetti on page load
  useEffect(() => {
    const duration = 4000 // 4 seconds
    const interval = 300 // Launch every 300ms
    let elapsed = 0
    
    const launchHeartConfetti = () => {
      const colors = ['#f093fb', '#f5576c', '#ff8ba7', '#e84393', '#ff6b9d']
      
      // Left side hearts
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
        shapes: ['heart'],
        scalar: 1.2,
        gravity: 0.8,
        drift: 0.5,
        ticks: 200,
        zIndex: 9999
      } as any)
      
      // Right side hearts
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
        shapes: ['heart'],
        scalar: 1.2,
        gravity: 0.8,
        drift: -0.5,
        ticks: 200,
        zIndex: 9999
      } as any)
      
      // Center burst
      confetti({
        particleCount: 5,
        angle: 90,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
        shapes: ['heart'],
        scalar: 1.5,
        gravity: 0.6,
        ticks: 250,
        zIndex: 9999
      } as any)
    }

    // Launch immediately
    launchHeartConfetti()
    
    // Continue launching
    const intervalId = setInterval(() => {
      elapsed += interval
      if (elapsed >= duration) {
        clearInterval(intervalId)
        return
      }
      launchHeartConfetti()
    }, interval)

    return () => clearInterval(intervalId)
  }, [])

  const rejectionMessages = [
    "Mann jao na Yr 🥺",
    "Please Ban jao mera valentine 💕",
    "Ek chance toh do 🌹",
    "Soch lo dobara ❤️",
    "Please yaar 🥹",
    "Itna bhi bura nahi hoon 😊",
    "Last time puch raha hoon 💝",
    "Pakka promise karenge khush rakhenge 🌟"
  ]

  const moveNoButton = () => {
    const container = document.getElementById('button-container-safia')
    if (!container || !noButtonRef.current) return

    const containerRect = container.getBoundingClientRect()
    const buttonRect = noButtonRef.current.getBoundingClientRect()

    const maxX = containerRect.width - buttonRect.width - 20
    const maxY = containerRect.height - buttonRect.height - 20

    const newX = Math.random() * maxX
    const newY = Math.random() * maxY

    setNoButtonPos({ x: newX, y: newY })
    setRejectionCount(prev => prev + 1)
  }

  const handleYes = () => {
    setShowSuccess(true)
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f093fb', '#f5576c', '#ff8ba7']
      })
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f093fb', '#f5576c', '#ff8ba7']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2e0a1f 0%, #3e1a2f 50%, #2e0a1f 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.05); }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(240, 147, 251, 0.7)); }
          50% { filter: drop-shadow(0 0 20px rgba(240, 147, 251, 1)); }
        }
      `}</style>

      {/* Floating hearts background */}
      {[...Array(25)].map((_, i) => {
        const delay = (i * 2) % 12
        const duration = 12 + (i % 6)
        const left = `${(i * 4) % 100}%`
        const size = 20 + (i % 4) * 10
        return (
          <div
            key={i}
            style={{
              position: 'fixed',
              bottom: '-10%',
              left,
              animation: `float ${duration}s linear ${delay}s infinite`,
              fontSize: `${size}px`,
              pointerEvents: 'none',
              willChange: 'transform',
              filter: 'drop-shadow(0 0 8px rgba(240, 147, 251, 0.6))'
            }}
          >
            {i % 3 === 0 ? '💖' : i % 3 === 1 ? '💕' : '🌸'}
          </div>
        )
      })}

      {/* Logout Button */}
      <button
        onClick={onLogout}
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          padding: '0.75rem 1.5rem',
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '2px solid rgba(240, 147, 251, 0.5)',
          color: '#f093fb',
          fontWeight: 600,
          fontSize: '0.875rem',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          zIndex: 100
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f093fb'
          e.currentTarget.style.color = '#fff'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
          e.currentTarget.style.color = '#f093fb'
        }}
      >
        Logout
      </button>

      <div style={{
        maxWidth: '800px',
        width: '100%',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(255, 245, 250, 0.95))',
          borderRadius: '2rem',
          padding: 'clamp(2rem, 5vw, 3rem)',
          boxShadow: '0 50px 100px rgba(240, 147, 251, 0.4), 0 0 0 3px rgba(240, 147, 251, 0.3)',
          border: '3px solid transparent',
          backgroundImage: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(255, 245, 250, 0.95)), linear-gradient(135deg, #f093fb, #f5576c, #f093fb)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          position: 'relative'
        }}>
          {/* Top heart decoration */}
          <div style={{
            position: 'absolute',
            top: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(3rem, 8vw, 4rem)',
            animation: 'heartbeat 1.5s ease-in-out infinite, glow 2s ease-in-out infinite'
          }}>
            💖
          </div>

          {/* Photo */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
            marginTop: '1.5rem'
          }}>
            <div style={{
              position: 'relative',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(240, 147, 251, 0.4)',
              border: '4px solid',
              borderImage: 'linear-gradient(135deg, #f093fb, #f5576c, #ff8ba7) 1',
              maxWidth: '300px',
              width: '100%',
              aspectRatio: '1/1'
            }}>
              <Image src="/img333.jpeg" alt="Safia" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 4rem)',
            fontFamily: '"Great Vibes", cursive',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #e84393 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            marginBottom: '1.5rem',
            filter: 'drop-shadow(0 2px 8px rgba(240, 147, 251, 0.3))'
          }}>
            Dear Safia 💕
          </h1>

          {/* Message */}
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
            lineHeight: '1.8',
            color: '#2d2d2d',
            textAlign: 'center',
            marginBottom: '2rem',
            fontWeight: 500,
            padding: '0 1rem'
          }}>
            This Valentine's Day, I want you to know how special you are to me. Your smile brightens my darkest days, and your presence makes everything beautiful. You're not just amazing – you're extraordinary! ❤️
          </p>

          {/* Question */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.08), rgba(245, 87, 108, 0.12))',
            borderRadius: '1.5rem',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '2rem',
            border: '2px solid rgba(240, 147, 251, 0.2)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              color: '#f5576c',
              marginBottom: '1rem',
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(245, 87, 108, 0.2)'
            }}>
              Will You Be My Valentine? 💝
            </h2>

            {/* Rejection messages */}
            {rejectionCount > 0 && rejectionCount < 8 && (
              <p style={{
                fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                color: '#e84393',
                marginBottom: '1.5rem',
                fontWeight: 600,
                animation: 'heartbeat 0.5s ease-in-out'
              }}>
                {rejectionMessages[rejectionCount - 1]}
              </p>
            )}

            {rejectionCount >= 8 && (
              <p style={{
                fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                color: '#d63384',
                marginBottom: '1.5rem',
                fontWeight: 700,
                animation: 'heartbeat 0.5s ease-in-out'
              }}>
                Bas ab toh haan bol do! Kitna tadpaogi? 😭💔
              </p>
            )}

            {/* Buttons */}
            <div
              id="button-container-safia"
              style={{
                position: 'relative',
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap',
                padding: '1rem'
              }}
            >
              {/* Yes Button */}
              <button
                onClick={handleYes}
                style={{
                  padding: 'clamp(1rem, 3vw, 1.25rem) clamp(2rem, 5vw, 3rem)',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(240, 147, 251, 0.5), 0 0 0 3px rgba(255, 255, 255, 0.3) inset',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(240, 147, 251, 0.7), 0 0 0 4px rgba(255, 255, 255, 0.4) inset'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(240, 147, 251, 0.5), 0 0 0 3px rgba(255, 255, 255, 0.3) inset'
                }}
              >
                Yes! 💖
              </button>

              {/* No Button - Uncatchable */}
              <button
                ref={noButtonRef}
                onMouseEnter={moveNoButton}
                onTouchStart={(e) => {
                  e.preventDefault()
                  moveNoButton()
                }}
                onClick={(e) => {
                  e.preventDefault()
                  moveNoButton()
                }}
                style={{
                  position: rejectionCount > 0 ? 'absolute' : 'relative',
                  left: rejectionCount > 0 ? `${noButtonPos.x}px` : 'auto',
                  top: rejectionCount > 0 ? `${noButtonPos.y}px` : 'auto',
                  padding: 'clamp(1rem, 3vw, 1.25rem) clamp(2rem, 5vw, 3rem)',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  transition: rejectionCount > 0 ? 'all 0.3s ease' : 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  userSelect: 'none'
                }}
              >
                No 💔
              </button>
            </div>
          </div>

          {/* Bottom decoration */}
          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            color: '#888',
            fontStyle: 'italic'
          }}>
            Made with love, just for you ❤️
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'linear-gradient(145deg, #fff, #fff5f9)',
            borderRadius: '2rem',
            padding: 'clamp(2rem, 5vw, 3rem)',
            maxWidth: '500px',
            textAlign: 'center',
            boxShadow: '0 50px 100px rgba(240, 147, 251, 0.6)',
            border: '3px solid #f093fb',
            animation: 'heartbeat 1s ease-in-out infinite'
          }}>
            <div style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', marginBottom: '1rem' }}>
              🎉💖🎊
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontFamily: '"Great Vibes", cursive',
              color: '#f5576c',
              marginBottom: '1rem'
            }}>
              Yayy! You Said Yes!
            </h2>
            <p style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              color: '#2d2d2d',
              lineHeight: '1.6',
              marginBottom: '2rem',
              fontWeight: 500
            }}>
              This is the best Valentine's Day ever! Thank you for making me the happiest person alive! 💕✨
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              style={{
                padding: '1rem 2.5rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(240, 147, 251, 0.5)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Close 💝
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
