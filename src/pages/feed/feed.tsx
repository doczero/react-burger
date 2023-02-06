import React, { FC } from 'react';
import styles from './feed.module.css'
import OrdersFeed from '../../components/orders-feed/orders-feed';
import OrdersDashboard from '../../components/orders-dashboard/orders-dashboard';

export const FeedPage: FC = () => {

  return (
    <>
      <div className={styles.heading}>
        <h1 className="text text_type_main-large">Лента заказов</h1>
      </div>
      <main className={styles.main}>
          <section className={styles.mainSection}>
            <OrdersFeed />
          </section>
          <section className={styles.mainSection}>   
              <OrdersDashboard />
          </section>
      </main>
      </>
  );
}
