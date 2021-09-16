import React from 'react'
import motion from 'framer-motion'

import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'

import styles from '../styles/Socials.module.css'

export default function Socials() {
    return (
        <div classname={styles.socials}>
            <a className={styles.icons} href="mailto: minsooerickim@gmail.com" target="_blank"><HiOutlineMail /></a>
            <a className={styles.icons} href="https://github.com/minsooerickim" target="_blank"><FiGithub /></a>
            <a className={styles.icons} href="https://www.linkedin.com/in/minsookime/" target="_blank"><FiLinkedin /></a>
            <a className={styles.icons} href="https://twitter.com/minsookime" target="_blank"><FiTwitter /></a>
        </div>
    )
}
