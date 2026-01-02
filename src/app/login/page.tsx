"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FlowerSVG from '../../components/FlowerSVG'

export default function LoginPage() {
  const router = useRouter()
  const [nick, setNick] = useState('')
  const [dob1, setDob1] = useState('')
  const [dob2, setDob2] = useState('')
  const [error, setError] = useState('')

  function validate() {
    setError('')
    const nickOk = nick.trim().toLowerCase() === 'imanoo'
    const dob1Ok = dob1 === '2004-08-14' 
    const dob2Ok = dob2 === '2007-01-03' 
    if (nickOk && dob1Ok && dob2Ok) {
      // Set session
      sessionStorage.setItem('isAuthenticated', 'true')
      router.push('/home')
    } else {
      setError('Credentials do not match — try again with love 💌')
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
      background: 'radial-gradient(ellipse 1200px 600px at 10% 10%, rgba(255, 182, 193, 0.2), transparent), radial-gradient(ellipse 800px 800px at 90% 90%, rgba(255, 192, 203, 0.15), transparent), linear-gradient(180deg, #fff5f7 0%, #ffe4f0 100%)'
    }}>
      {/* Falling flowers animation */}
      {[...Array(15)].map((_, i) => {
        const delay = (i * 1.5) % 8
        const duration = 8 + (i % 4)
        const left = `${(i * 7) % 100}%`
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '-15vh',
              left,
              animation: `fall ${duration}s linear ${delay}s infinite`,
              opacity: 0.85,
              pointerEvents: 'none',
              willChange: 'transform'
            }}
          >
            <FlowerSVG className="w-10 h-10 md:w-12 md:h-12" />
          </div>
        )
      })}

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '500px',
        zIndex: 10
      }}>
        <div style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 250, 252, 0.95))',
          borderRadius: '1.5rem',
          boxShadow: '0 30px 60px -15px rgba(255, 105, 135, 0.3), 0 0 0 1px rgba(255, 182, 193, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
          padding: '2rem 1.5rem',
          backdropFilter: 'blur(12px)',
          border: '2px solid transparent',
          backgroundClip: 'padding-box'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1rem', fontSize: '3rem', filter: 'drop-shadow(0 2px 4px rgba(255, 105, 135, 0.3))' }}>
              💕
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 8vw, 3rem)',
              fontFamily: '"Great Vibes", cursive',
              color: '#ff6f91',
              marginBottom: '0.5rem',
              fontWeight: 400,
              lineHeight: 1.2,
              textShadow: '0 2px 8px rgba(255, 105, 135, 0.2)'
            }}>
              Welcome my love Iman
            </h1>
            <p style={{
              fontSize: 'clamp(0.875rem, 3vw, 0.95rem)',
              color: '#ec4899',
              opacity: 0.9
            }}>
              Enter your special credentials to unlock your home
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); validate() }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: '#4b5563', fontWeight: 500 }}>
                Enter your Nick Name
              </label>
              <input
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                placeholder=""
                style={{
                  padding: '0.875rem 1rem',
                  borderRadius: '1rem',
                  border: '1.5px solid #fce7f3',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  background: '#fff',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#fbcfe8'
                  e.target.style.boxShadow = '0 0 0 3px rgba(251, 207, 232, 0.3)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#fce7f3'
                  e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: '#4b5563', fontWeight: 500 }}>
                  My date of birth
                </label>
                <input
                  type="date"
                  value={dob1}
                  onChange={(e) => setDob1(e.target.value)}
                  placeholder=""
                  style={{
                    padding: '0.875rem 1rem',
                    borderRadius: '1rem',
                    border: '1.5px solid #fce7f3',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s',
                    background: '#fff',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#fbcfe8'
                    e.target.style.boxShadow = '0 0 0 3px rgba(251, 207, 232, 0.3)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#fce7f3'
                    e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: '#4b5563', fontWeight: 500 }}>
                  Your date of birth
                </label>
                <input
                  type="date"
                  value={dob2}
                  onChange={(e) => setDob2(e.target.value)}
                  placeholder=""
                  style={{
                    padding: '0.875rem 1rem',
                    borderRadius: '1rem',
                    border: '1.5px solid #fce7f3',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s',
                    background: '#fff',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#fbcfe8'
                    e.target.style.boxShadow = '0 0 0 3px rgba(251, 207, 232, 0.3)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#fce7f3'
                    e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                />
              </div>
            </div>

            {error && (
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                background: '#fee2e2',
                color: '#dc2626',
                fontSize: '0.875rem',
                border: '1px solid #fecaca'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              style={{
                marginTop: '0.5rem',
                padding: '0.875rem 1.5rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #ff6f91 0%, #ff1493 50%, #ec4899 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 30px -5px rgba(236, 72, 153, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                width: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                e.currentTarget.style.boxShadow = '0 15px 40px -5px rgba(236, 72, 153, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2) inset'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(236, 72, 153, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
              }}
            >
              Open the Door 💖
            </button>
          </form>

          <p style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: 'clamp(0.75rem, 2.5vw, 0.8rem)',
            color: '#9ca3af'
          }}>
            This is a demo page — no data is stored.
          </p>
        </div>
      </div>
    </div>
  )
}
