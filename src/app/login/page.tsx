"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function validate() {
    setError('')
    const nameLower = name.trim().toLowerCase()
    
    // Check credentials for 3 users
    const validCredentials = [
      { name: 'iman', dob: '2007-01-03' },
      { name: 'noor', dob: '2005-03-25' },
      { name: 'safia', dob: '2006-09-01' }
    ]
    
    const isValid = validCredentials.some(
      cred => cred.name === nameLower && cred.dob === dob
    )
    
    if (isValid) {
      sessionStorage.setItem('isAuthenticated', 'true')
      sessionStorage.setItem('userName', name.trim())
      router.push('/home')
    } else {
      setError('Incorrect credentials — please try again with love 💌')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0f 50%, #0f0a0a 100%)',
    }}>
      {/* Animated hearts background */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>

      {/* Floating hearts - only render on client */}
      {mounted && [...Array(20)].map((_, i) => {
        const delay = (i * 2) % 15
        const duration = 15 + (i % 5)
        const left = `${(i * 5) % 100}%`
        const size = 20 + (i % 3) * 10
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: '-10%',
              left,
              animation: `float ${duration}s linear ${delay}s infinite`,
              fontSize: `${size}px`,
              pointerEvents: 'none',
              willChange: 'transform',
              filter: 'drop-shadow(0 0 10px rgba(255, 0, 50, 0.5))'
            }}
          >
            ❤️
          </div>
        )
      })}

      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220, 20, 60, 0.2), transparent 70%)',
        top: '-300px',
        right: '-300px',
        pointerEvents: 'none',
        animation: 'pulse 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 0, 0, 0.25), transparent 70%)',
        bottom: '-250px',
        left: '-250px',
        pointerEvents: 'none',
        animation: 'pulse 6s ease-in-out infinite reverse'
      }} />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '440px',
        zIndex: 10,
        padding: '0 0.5rem'
      }}>
        {/* Card with elegant border */}
        <div style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #fff8f9 50%, #fef5f7 100%)',
          borderRadius: '1.75rem',
          boxShadow: '0 40px 80px -20px rgba(220, 20, 60, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 2px 0 0 rgba(255, 255, 255, 1)',
          padding: 'clamp(2rem, 5vw, 2.75rem) clamp(1.5rem, 4vw, 2.25rem)',
          backdropFilter: 'blur(20px)',
          border: '3px solid transparent',
          backgroundImage: 'linear-gradient(145deg, #ffffff 0%, #fff8f9 50%, #fef5f7 100%), linear-gradient(135deg, #dc143c, #ff1744, #8b0000, #dc143c)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          animation: 'pulse 4s ease-in-out infinite',
          position: 'relative',
          overflow: 'visible'
        }}>
          {/* Top heart decoration */}
          <div style={{
            position: 'absolute',
            top: '-22px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(2.25rem, 6vw, 2.75rem)',
            filter: 'drop-shadow(0 4px 16px rgba(220, 20, 60, 0.8))',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            💕
          </div>
          
          {/* Corner decorations */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', fontSize: 'clamp(1.125rem, 4vw, 1.375rem)', opacity: 0.7 }}>🌹</div>
          <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: 'clamp(1.125rem, 4vw, 1.375rem)', opacity: 0.7 }}>🌹</div>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(1.75rem, 4vw, 2.25rem)' }}>
            <h1 style={{
              fontSize: 'clamp(2.25rem, 7vw, 3rem)',
              fontFamily: '"Great Vibes", cursive',
              background: 'linear-gradient(135deg, #dc143c 0%, #ff1744 30%, #c41e3a 60%, #8b0000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 'clamp(0.625rem, 2vw, 0.875rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              filter: 'drop-shadow(0 3px 12px rgba(220, 20, 60, 0.4))',
              letterSpacing: '0.5px'
            }}>
              Happy Valentine's Day
            </h1>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'clamp(0.5rem, 2vw, 0.75rem)',
              marginBottom: 'clamp(0.5rem, 2vw, 0.75rem)',
              flexWrap: 'wrap'
            }}>
              <span style={{ fontSize: 'clamp(1.125rem, 4vw, 1.375rem)', animation: 'pulse 1s ease-in-out infinite' }}>💖</span>
              <p style={{
                fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                background: 'linear-gradient(90deg, #dc143c, #ff1744, #8b0000)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 700,
                letterSpacing: '0.5px'
              }}>
                Welcome, My Love
              </p>
              <span style={{ fontSize: 'clamp(1.125rem, 4vw, 1.375rem)', animation: 'pulse 1s ease-in-out infinite' }}>💖</span>
            </div>
            <p style={{
              fontSize: 'clamp(0.8125rem, 2.5vw, 0.9375rem)',
              color: '#666',
              lineHeight: 1.5,
              maxWidth: '320px',
              margin: '0 auto',
              padding: '0 0.5rem'
            }}>
              Enter your special details to unlock your surprise
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); validate() }} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
            {/* Name Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ 
                fontSize: 'clamp(0.875rem, 2.5vw, 0.9375rem)', 
                color: '#1a1a1a', 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                letterSpacing: '0.2px'
              }}>
                <span style={{ fontSize: 'clamp(1rem, 3vw, 1.125rem)' }}>💝</span>
                Your Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                style={{
                  padding: 'clamp(0.875rem, 2.5vw, 1rem) clamp(1rem, 3vw, 1.25rem)',
                  borderRadius: '1rem',
                  border: '2px solid #dc143c',
                  fontSize: 'clamp(0.9375rem, 2.5vw, 1rem)',
                  outline: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: '#ffffff',
                  boxShadow: '0 3px 10px rgba(220, 20, 60, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
                  color: '#1a1a1a',
                  fontWeight: 600,
                  width: '100%'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ff1744'
                  e.target.style.boxShadow = '0 0 0 4px rgba(220, 20, 60, 0.2), 0 6px 16px rgba(220, 20, 60, 0.3)'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.background = '#fffeff'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#dc143c'
                  e.target.style.boxShadow = '0 3px 10px rgba(220, 20, 60, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.9)'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.background = '#ffffff'
                }}
              />
            </div>

            {/* Date of Birth Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ 
                fontSize: 'clamp(0.875rem, 2.5vw, 0.9375rem)', 
                color: '#1a1a1a', 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                letterSpacing: '0.2px'
              }}>
                <span style={{ fontSize: 'clamp(1rem, 3vw, 1.125rem)' }}>🎂</span>
                Your Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                style={{
                  padding: 'clamp(0.875rem, 2.5vw, 1rem) clamp(1rem, 3vw, 1.25rem)',
                  borderRadius: '1rem',
                  border: '2px solid #dc143c',
                  fontSize: 'clamp(0.9375rem, 2.5vw, 1rem)',
                  outline: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: '#ffffff',
                  boxShadow: '0 3px 10px rgba(220, 20, 60, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
                  color: '#1a1a1a',
                  fontWeight: 600,
                  width: '100%'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ff1744'
                  e.target.style.boxShadow = '0 0 0 4px rgba(220, 20, 60, 0.2), 0 6px 16px rgba(220, 20, 60, 0.3)'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.background = '#fffeff'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#dc143c'
                  e.target.style.boxShadow = '0 3px 10px rgba(220, 20, 60, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.9)'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.background = '#ffffff'
                }}
              />
            </div>

            {error && (
              <div style={{
                padding: 'clamp(0.875rem, 2.5vw, 1rem) clamp(1rem, 3vw, 1.25rem)',
                borderRadius: '1rem',
                background: 'linear-gradient(135deg, #fff8f8 0%, #ffe8e8 100%)',
                color: '#b91c1c',
                fontSize: 'clamp(0.8125rem, 2.5vw, 0.875rem)',
                border: '2px solid #ff4757',
                fontWeight: 600,
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(220, 20, 60, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                animation: 'pulse 0.5s ease-in-out',
                lineHeight: 1.4
              }}>
                <span style={{ fontSize: 'clamp(0.9375rem, 3vw, 1rem)' }}>❌</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              style={{
                marginTop: 'clamp(0.5rem, 2vw, 0.75rem)',
                padding: 'clamp(0.875rem, 2.5vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #dc143c 0%, #c41e3a 50%, #8b0000 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 'clamp(0.875rem, 2.5vw, 0.9375rem)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 24px -5px rgba(220, 20, 60, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.2) inset, 0 -2px 8px rgba(0, 0, 0, 0.15) inset',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 32px -5px rgba(220, 20, 60, 0.7), 0 0 0 3px rgba(255, 255, 255, 0.3) inset, 0 -2px 8px rgba(0, 0, 0, 0.15) inset'
                e.currentTarget.style.background = 'linear-gradient(135deg, #ff1744 0%, #dc143c 50%, #c41e3a 100%)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 24px -5px rgba(220, 20, 60, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.2) inset, 0 -2px 8px rgba(0, 0, 0, 0.15) inset'
                e.currentTarget.style.background = 'linear-gradient(135deg, #dc143c 0%, #c41e3a 50%, #8b0000 100%)'
              }}
            >
              💘 Unlock Your Surprise 💘
            </button>
          </form>

          {/* Bottom decoration */}
          <div style={{
            marginTop: 'clamp(1.5rem, 3vw, 2rem)',
            padding: 'clamp(0.875rem, 2.5vw, 1rem)',
            textAlign: 'center',
            fontSize: 'clamp(0.8125rem, 2.5vw, 0.875rem)',
            background: 'linear-gradient(135deg, rgba(220, 20, 60, 0.05), rgba(139, 0, 0, 0.08))',
            borderRadius: '0.875rem',
            border: '1px solid rgba(220, 20, 60, 0.15)',
            boxShadow: 'inset 0 2px 6px rgba(220, 20, 60, 0.08)'
          }}>
            <p style={{
              color: '#666',
              fontStyle: 'italic',
              fontWeight: 500,
              margin: 0,
              lineHeight: 1.5
            }}>
              "Love is not just a feeling,<br />it's my promise to you" ❤️
            </p>
          </div>
          
          {/* Bottom heart decorations */}
          <div style={{
            position: 'absolute',
            bottom: 'clamp(10px, 2vw, 14px)',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 'clamp(0.625rem, 2vw, 0.875rem)',
            fontSize: 'clamp(1rem, 3vw, 1.125rem)',
            opacity: 0.75
          }}>
            <span>💖</span>
            <span>💝</span>
            <span>💖</span>
          </div>
        </div>
      </div>
    </div>
  )
}