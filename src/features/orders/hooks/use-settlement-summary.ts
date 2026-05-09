'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  getSettlementSummary,
  type SettlementSummary,
} from '@/features/orders/services/settlement-summary.service';

export function useSettlementSummary() {
  const [summary, setSummary] = useState<SettlementSummary>({
    settlementAmount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadSummary = useCallback(async () => {
    try {
      setIsLoading(true);

      const nextSummary = await getSettlementSummary();

      setSummary(nextSummary);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void loadSummary();
    });

    window.addEventListener('orders:settlement-summary-updated', loadSummary);

    return () => {
      window.removeEventListener(
        'orders:settlement-summary-updated',
        loadSummary,
      );
    };
  }, [loadSummary]);

  return {
    summary,
    isLoading,
  };
}
