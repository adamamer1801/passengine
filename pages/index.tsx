import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { RxWidth } from 'react-icons/all'
import { ArrowRotateLeft, ArrowSwapHorizontal, Check, Copy, GridLock, Keyboard, TickSquare } from 'iconsax-react'
import { ActionIcon, Chip, CopyButton, Progress, Slider, Textarea, Tooltip, createStyles } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useStyleRegistry } from 'styled-jsx'
import { createPassword } from '@/functions/createPassword'
import { getPasswordStrength } from '@/functions/getPasswordStrength'
const inter = Inter({ subsets: ['latin'] })

const chipStyles = createStyles((theme, _params, getRef) => ({
  label: {
    '&[data-checked]': {
      '&, &:hover': {
        backgroundColor: "#006d77",
        borderColor: "#006d77",
        color: "#ffffff",
      },

      [`& .${getRef('iconWrapper')}`]: {
        color: "#ffffff",
      },
    },
  },
}));

export default function Home() {
  const [length, setLength] = useState(1)
  const [settings, setSettings] = useState(["uppercase", "lowercase"])
  const [strength, setStrength] = useState(0)
  const [excluded, setExcluded] = useState("")
  const [included, setIncluded] = useState("")
  const [password, setPassword] = useState("")
  const { classes } = chipStyles()

  useEffect(() => {
    setPassword(createPassword({
      uppercase: settings.includes("uppercase"),
      lowercase: settings.includes("lowercase"),
      special: settings.includes("special"),
      numbers: settings.includes("numbers"),
      excludeCharacters: excluded,
      includeCharacters: included,
      length: length
    }))
  }, [length, settings, excluded, included])

  useEffect(() => {
    if (password == "No characters") setStrength(0);
    else setStrength(getPasswordStrength(password))
  }, [password])

  const regeneratePassword = () => {
    setPassword(createPassword({
      uppercase: settings.includes("uppercase"),
      lowercase: settings.includes("lowercase"),
      special: settings.includes("special"),
      numbers: settings.includes("numbers"),
      excludeCharacters: excluded,
      includeCharacters: included,
      length: length
    }))
  }

  return (
    <>
      <Head>
        <title>PassEngine</title>
        <meta name="description" content="creates a password" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.flexContainer}>
          <div className={styles.mainContainer}>
            <div className={styles.passwordBox}>
              <div className={styles.passwordBoxUtils}>
                <div className={styles.passwordBoxItem}>
                  <CopyButton value={password} timeout={2000} >
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                        <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                          {copied ? <TickSquare size={32} color={"#06d6a0"} /> : <Copy size={32} color={"#ffffff"} />}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </div>
                <div className={styles.passwordBoxItem}>
                  <Tooltip label="Regenerate" withArrow position="right">
                    <ActionIcon onClick={() => { regeneratePassword() }}>
                      <ArrowRotateLeft size={32} color={"#ffffff"} />
                    </ActionIcon>
                  </Tooltip>
                </div>
              </div>
              <div className={styles.password}>
                <span id="password">
                  {password}
                </span>
              </div>
            </div>
            <div className={styles.generateYourPassword}>
              Generate Your Password
            </div>
            <div className={styles.panelsContainer}>
              <div className={styles.panel}>
                <div className={styles.panelTitleIcon}>
                  <ArrowSwapHorizontal size={32} color={"#ffffff"} />
                  <span className={styles.panelTitle}>Length</span>
                </div>
                <Slider
                  className={styles.lengthSlider}
                  scale={(v) => 2 ** v}
                  step={1}
                  min={2}
                  max={80}
                  //@ts-ignore
                  onChange={(v) => { setLength(v) }}
                  onChangeEnd={async (v) => {
                  }}
                  defaultValue={8}
                  label={length + " characters"}
                  styles={(theme) => ({
                    track: {
                      width: "13rem",
                    },
                    bar: {
                      backgroundColor: "#006d77",
                    },
                    thumb: {
                      height: 16,
                      width: 16,
                      borderWidth: 0,
                      backgroundColor: "#ffffff"
                    }
                  })}
              />
                <span className={styles.lengthIndicator}>{length} characters</span>
              </div>
              <div className={styles.panel}>
                <div className={styles.panelTitleIcon}>
                  <Keyboard size={32} color={"#ffffff"} />
                  <span className={styles.panelTitle}>Characters</span>
                </div>
                <Chip.Group value={settings} onChange={setSettings} className={styles.characterPanelSelect} multiple>
                  <Chip classNames={classes} value={"uppercase"}>Uppercase</Chip>
                  <Chip classNames={classes} value={"lowercase"}>Lowercase</Chip>
                  <Chip classNames={classes} value={"numbers"}>Numbers</Chip>
                  <Chip classNames={classes} value={"special"}>Special Characters</Chip>
                </Chip.Group>
                <Textarea
                  placeholder="{,*@c83"
                  description="Characters to exclude seperated by nothing"
                  minRows={1}
                  className={styles.characterPanelTextarea}
                  id="excludeCharacters"
                  onChange={(e) => { setExcluded(e.currentTarget.value) }}
                />
                <Textarea
                  placeholder="}h23u"
                  description="Characters to include seperated by nothing"
                  minRows={1}
                  className={styles.characterPanelTextarea}
                  id="includeCharacters"
                  onChange={(e) => { setIncluded(e.currentTarget.value) }}

                />
              </div>
              <div className={styles.panel}>
                <div className={styles.panelTitleIcon}>
                  <GridLock size={32} color={"#ffffff"} />
                  <span className={styles.panelTitle}>Strength</span>
                </div>
                <Progress className={styles.strengthBar} value={strength} size={"md"} radius="xl"
                  color={strength <= 100 && strength > 80 ? "#84a98c" : strength > 50 ? "#ffd166" : "#ef476f"} />
              </div>
          </div>
          </div>
        </div>
      </main>
    </>
  )
}
