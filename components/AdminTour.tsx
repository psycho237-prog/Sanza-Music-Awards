"use client";

import { useEffect, useState, useCallback } from 'react';
import { driver } from 'driver.js';
import "driver.js/dist/driver.css";

export const useAdminTour = () => {
    const [driverObj, setDriverObj] = useState<any>(null);

    useEffect(() => {
        const driverInstance = driver({
            showProgress: true,
            animate: true,
            popoverClass: 'driverjs-theme',
            steps: [
                {
                    element: '#admin-header',
                    popover: {
                        title: 'Bienvenue Admin',
                        description: 'Ceci est votre tableau de bord. Ici, vous pouvez voir un aperçu de toutes les activités.',
                        side: "bottom",
                        align: 'start'
                    }
                },
                {
                    element: '#stats-grid',
                    popover: {
                        title: 'Statistiques Clés',
                        description: 'Visualisez les votes totaux, les revenus générés, le nombre de transactions et le taux de réussite en temps réel.',
                        side: "bottom",
                        align: 'start'
                    }
                },
                {
                    element: '#status-summary',
                    popover: {
                        title: 'État des Transactions',
                        description: 'Un résumé rapide des transactions réussies, en attente et échouées.',
                        side: "bottom",
                        align: 'start'
                    }
                },
                {
                    element: '#live-transactions',
                    popover: {
                        title: 'Transactions en Direct',
                        description: 'Suivez les transactions entrantes en temps réel. Vous pouvez filtrer par statut ici.',
                        side: "top",
                        align: 'start'
                    }
                },
                {
                    element: '#top-nominees',
                    popover: {
                        title: 'Top Nommés',
                        description: 'Voir les artistes les plus performants actuellement.',
                        side: "left",
                        align: 'start'
                    }
                },
                {
                    element: '#categories-grid',
                    popover: {
                        title: 'Catégories',
                        description: 'Gérez et visualisez toutes les catégories de prix ici.',
                        side: "top",
                        align: 'start'
                    }
                }
            ],
            nextBtnText: 'Suivant',
            prevBtnText: 'Précédent',
            doneBtnText: 'Terminer',
        });

        setDriverObj(driverInstance);
    }, []);

    const startTour = useCallback(() => {
        if (driverObj) {
            driverObj.drive();
        }
    }, [driverObj]);

    return { startTour };
};

