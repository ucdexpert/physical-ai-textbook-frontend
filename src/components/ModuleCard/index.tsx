import React from 'react';
import styles from './styles.module.css';

interface ModuleCardProps {
    title: string;
    description: string;
    link?: string;
}

export default function ModuleCard({ title, description, link = '#' }: ModuleCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.buttonWrapper}>
                <a href={link} className={styles.button}>
                    Open Module
                </a>
            </div>
        </div>
    );
}
