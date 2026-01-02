"use client"
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import FlowerSVG from '../../components/FlowerSVG'
import confetti from 'canvas-confetti'

export default function HomePage() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const fireworksIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem('isAuthenticated')
    if (auth !== 'true') {
      router.push('/login')
      return
    }
    setIsAuthenticated(true)

    // Launch realistic fireworks for 8 seconds only
    const duration = 8000 // 8 seconds
    const interval = 500 // Launch every 500ms
    let elapsed = 0
    
    const launchFireworks = () => {
      // Real firework colors: gold, white, red, blue, yellow, orange
      const colorSets = [
        ['#FFD700', '#FFA500', '#FF8C00'], // Gold/Orange
        ['#FF0000', '#FF6347', '#DC143C'], // Red
        ['#4169E1', '#1E90FF', '#00BFFF'], // Blue
        ['#FFFFFF', '#F0F0F0', '#E0E0E0'], // White/Silver
        ['#FFFF00', '#FFD700', '#FFA500'], // Yellow/Gold
        ['#00FF00', '#32CD32', '#00FA9A']  // Green
      ]
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min
      const colors = colorSets[Math.floor(Math.random() * colorSets.length)]
      
      // Create firework burst from bottom going up
      confetti({
        particleCount: 150,
        startVelocity: 45,
        spread: 360,
        origin: { 
          x: randomInRange(0.2, 0.8), 
          y: randomInRange(0.5, 0.7) 
        },
        colors: colors,
        gravity: 1,
        scalar: 1.5,
        ticks: 300,
        shapes: ['star', 'circle'],
        zIndex: 9999
      })
      
      // Add trailing sparkles
      setTimeout(() => {
        confetti({
          particleCount: 50,
          startVelocity: 25,
          spread: 180,
          origin: { 
            x: randomInRange(0.2, 0.8), 
            y: randomInRange(0.5, 0.7) 
          },
          colors: ['#FFD700', '#FFA500'],
          gravity: 0.8,
          scalar: 0.8,
          ticks: 200,
          shapes: ['star'],
          zIndex: 9999
        })
      }, 200)
    }

    // Launch fireworks immediately
    launchFireworks()
    
    // Continue launching until duration is reached
    fireworksIntervalRef.current = setInterval(() => {
      elapsed += interval
      if (elapsed >= duration) {
        if (fireworksIntervalRef.current) {
          clearInterval(fireworksIntervalRef.current)
        }
        return
      }
      launchFireworks()
    }, interval)

    // Cleanup on unmount
    return () => {
      if (fireworksIntervalRef.current) {
        clearInterval(fireworksIntervalRef.current)
      }
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated')
    router.push('/login')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #fff5f7 0%, #ffe4f0 50%, #ffd6e8 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem 1rem'
    }}>
      {/* Falling flowers in background */}
      {[...Array(15)].map((_, i) => {
        const delay = (i * 1.2) % 6
        const duration = 8 + (i % 4)
        const left = `${(i * 7) % 100}%`
        return (
          <div
            key={i}
            style={{
              position: 'fixed',
              top: '-10vh',
              left,
              animation: `fall ${duration}s linear ${delay}s infinite`,
              opacity: 0.3,
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            <FlowerSVG className="w-6 h-6" />
          </div>
        )
      })}

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Logout Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '2px solid rgba(255, 105, 135, 0.3)',
              color: '#ff6f91',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(255, 105, 135, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #ff6f91 0%, #ff1493 100%)'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 105, 135, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.color = '#ff6f91'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 105, 135, 0.2)'
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ff6f91 0%, #ff1493 50%, #c71585 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            textShadow: '0 4px 12px rgba(255, 105, 135, 0.3)',
            fontFamily: '"Great Vibes", cursive'
          }}>
            Happy Birthday, Iman! 🎉
          </h1>
        </div>

        <div style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 250, 252, 0.9))',
          borderRadius: '2rem',
          padding: '2.5rem 2rem',
          marginBottom: '3rem',
          boxShadow: '0 20px 60px -15px rgba(255, 105, 135, 0.3), 0 0 0 1px rgba(255, 182, 193, 0.3)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 192, 203, 0.2)'
        }}>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            lineHeight: '2',
            color: '#4a4a4a',
            textAlign: 'center',
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 400,
            letterSpacing: '0.3px'
          }}>
            Happy Birthday, Iman! On this special day, I want to celebrate the amazing person you are. Your smile lights up every room, your kindness touches every heart, and your strength inspires everyone around you. May this year bring you endless joy, beautiful moments, and all the dreams you've ever wished for. You deserve nothing but the very best!
          </p>
        </div>

        <div style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 250, 252, 0.9))',
          borderRadius: '2rem',
          padding: '2.5rem 2rem',
          marginBottom: '3rem',
          boxShadow: '0 20px 60px -15px rgba(255, 105, 135, 0.3), 0 0 0 1px rgba(255, 182, 193, 0.3)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 192, 203, 0.2)'
        }}>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            lineHeight: '2',
            color: '#4a4a4a',
            textAlign: 'center',
            fontFamily: '"Dancing Script", cursive',
            fontWeight: 500,
            letterSpacing: '0.5px'
          }}>
            Another year of your beautiful presence in this world is a gift we all cherish. Your laughter is like music, your wisdom guides us, and your love makes everything better. Here's to more adventures, more memories, and more reasons to celebrate you. Happy Birthday, Iman! 🎂✨
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '3rem'
        }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              boxShadow: '0 15px 40px -10px rgba(255, 105, 135, 0.3)',
              border: '3px solid rgba(255, 182, 193, 0.4)',
              background: '#fff',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              maxWidth: '400px',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 20px 50px -10px rgba(255, 105, 135, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 15px 40px -10px rgba(255, 105, 135, 0.3)'
            }}
          >
            <div style={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
              <Image src="/img.jpeg" alt="Birthday Memory" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff6f91 0%, #ff1493 100%)',
          border: 'none',
          boxShadow: '0 8px 30px rgba(255, 20, 147, 0.4), 0 0 0 3px rgba(255, 255, 255, 0.8)',
          cursor: 'pointer',
          fontSize: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          zIndex: 1000,
          animation: 'sparkle 2s ease-in-out infinite'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)'
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 20, 147, 0.6), 0 0 0 3px rgba(255, 255, 255, 0.9)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 20, 147, 0.4), 0 0 0 3px rgba(255, 255, 255, 0.8)'
        }}
      >
        🎁
      </button>

      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            overflowY: 'auto'
          }}
          onClick={() => setMenuOpen(false)}
        >
          {[...Array(20)].map((_, i) => {
            const delay = (i * 0.8) % 5
            const duration = 6 + (i % 3)
            const left = `${(i * 5) % 100}%`
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '-15vh',
                  left,
                  animation: `fall ${duration}s linear ${delay}s infinite`,
                  opacity: 0.9,
                  pointerEvents: 'none',
                  willChange: 'transform'
                }}
              >
                <FlowerSVG className="w-8 h-8" />
              </div>
            )
          })}

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 250, 252, 0.95))',
              borderRadius: '1.5rem',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '85vh',
              overflowY: 'auto',
              boxShadow: '0 30px 80px -20px rgba(255, 105, 135, 0.5), 0 0 0 2px rgba(255, 182, 193, 0.5)',
              animation: 'slideIn 0.5s ease-out',
              position: 'relative',
              border: '3px solid rgba(255, 192, 203, 0.3)',
              margin: 'auto'
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'sticky',
                top: '0.5rem',
                float: 'right',
                background: 'linear-gradient(135deg, #ff6f91, #ff1493)',
                border: '2px solid rgba(255, 255, 255, 0.9)',
                fontSize: '1.25rem',
                cursor: 'pointer',
                color: '#fff',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(255, 20, 147, 0.4)',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 20, 147, 0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 20, 147, 0.4)'
              }}
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: '2rem', clear: 'both', paddingTop: '1rem' }}>
              <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>💝</div>
              <h2 style={{
                fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
                fontFamily: '"Great Vibes", cursive',
                color: '#ff6f91',
                marginBottom: '0.5rem'
              }}>
                A Special Message
              </h2>
            </div>

            <div style={{
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              lineHeight: '2',
              color: '#4a4a4a',
              textAlign: 'right',
              direction: 'rtl',
              fontFamily: '"Jameel Noori Nastaleeq", "Noto Nastalikh Urdu", serif',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              background: 'rgba(255, 240, 245, 0.5)',
              borderRadius: '1rem',
              border: '2px solid rgba(255, 182, 193, 0.3)'
            }}>
              <p style={{ marginBottom: '1.5rem', fontWeight: 500 }}>تجھے روز دیکھوں قریب سے میرے شوق بھی ہیں عجیب سے</p>
              <p style={{ marginBottom: '1.5rem' }}>میں نے مانگا ہے بس تجھی کو اپنے رب اور اس کے حبیب سے</p>
              <p style={{ marginBottom: '1.5rem' }}>میری آنکھوں میں ہے بس عاجزی میرے خواب بھی ہیں غریب سے</p>
              <p style={{ marginBottom: '1.5rem' }}>میرے سب دکھوں کی دوا ہو تم ملے کیا سکوں پھر طبیب سے</p>
              <p style={{ marginBottom: 0 }}>میں بہت ہی خوش ہوں جوڑ کر نصیب اپنے تیرے نصیب سے</p>
            </div>

            <div style={{
              marginTop: '1.5rem',
              textAlign: 'center',
              color: '#9ca3af',
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'
            }}>
              With all my love 💕
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
