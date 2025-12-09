import React from 'react';
import Layout from '@theme/Layout';
import ModuleCard from '../components/ModuleCard';

export default function ModuleCardDemo() {
    return (
        <Layout title="Module Card Demo" description="Demo of the new Module Card component">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #0F172A 0%, #1A535C 100%)', // Simulating the requested dark background
                    padding: '2rem',
                }}>
                <div style={{ maxWidth: '400px', width: '100%' }}>
                    <ModuleCard
                        title="Module 1: ROS 2 Basics"
                        description="Learn the fundamentals of the Robot Operating System (ROS 2), including nodes, topics, services, and actions."
                        link="/docs/module1"
                    />
                </div>
            </div>
        </Layout>
    );
}
