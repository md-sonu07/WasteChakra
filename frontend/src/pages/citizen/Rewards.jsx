import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { dataProvider } from '../../services/dataProvider';
import { Card, Button, ProgressBar, Skeleton, ErrorState, EmptyState } from '../../components/ui';
import { Icon } from '../../components/AppIcons';

export default function Rewards() {
  const { user } = useAuth();
  const [impact, setImpact] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [leaderboard, setLeaderboard] = useState(null);
  const [tab, setTab] = useState('individual');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redeemed, setRedeemed] = useState({});

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [impactData, rewardsData, achievementsData, leaderboardData] = await Promise.all([
        dataProvider.getImpact(),
        dataProvider.getRewards(),
        dataProvider.getAchievements(),
        dataProvider.getLeaderboard(),
      ]);
      setImpact(impactData);
      setRewards(rewardsData);
      setAchievements(achievementsData);
      setLeaderboard(leaderboardData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const points = user?.profile?.chakra_points || impact?.chakra_points || 0;
  const nextReward = rewards.find((r) => r.cost > points);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-40" />
        <Skeleton className="h-12 w-48" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchData} />;
  }

  const leaderData = tab === 'individual' ? leaderboard?.individuals || [] : leaderboard?.neighborhoods || [];

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gradient-to-br from-forest to-emerald-700 rounded-2xl p-6 text-secondary-fixed relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 14px, #fff 14px, #fff 15px)',
          }}
        />
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-secondary-container text-primary flex items-center justify-center">
            <Icon name="stars" className="text-3xl" />
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md text-white font-bold">CHAKRA POINTS</h1>
            <p className="font-stat-counter text-4xl font-extrabold text-secondary">{points.toLocaleString()}</p>
          </div>
        </div>
        <div className="relative mt-4 bg-white/10 rounded-full px-3 py-1.5 inline-flex items-center gap-2">
          <Icon name="local_fire_department" className="text-base text-secondary" />
          <span className="text-sm font-bold">{impact?.streak_days || 7} Day Streak</span>
        </div>
        <div className="relative mt-4">
          {nextReward ? (
            <>
              <div className="flex justify-between text-xs text-white/80 mb-1">
                <span>Next: {nextReward.title}</span>
                <span>{points} / {nextReward.cost}</span>
              </div>
              <ProgressBar value={(points / nextReward.cost) * 100} color="bg-secondary" />
            </>
          ) : (
            <p className="text-xs text-white/80">You can redeem any reward!</p>
          )}
        </div>
      </div>

      <h2 className="font-headline-md text-headline-md text-primary font-bold">🎁 Reward Center</h2>
      {rewards.length === 0 ? (
        <EmptyState title="No rewards available" message="Check back soon for new rewards." icon="card_giftcard" />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {rewards.map((reward) => {
            const canAfford = points >= reward.cost;
            const isRedeemed = redeemed[reward.id];
            return (
              <Card key={reward.id} className="flex flex-col gap-2 p-4">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center ${canAfford ? 'bg-secondary-container text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  <Icon name={reward.icon} className="" />
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold">{reward.title}</h3>
                <p className="text-xs text-on-surface-variant flex-1">{reward.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-primary">{reward.cost} pts</span>
                  <Button
                    variant={canAfford && !isRedeemed ? 'primary' : 'outline'}
                    size="sm"
                    disabled={!canAfford || isRedeemed}
                    onClick={() => setRedeemed({ ...redeemed, [reward.id]: true })}
                  >
                    {isRedeemed ? 'Redeemed ✓' : 'Redeem'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <h2 className="font-headline-md text-headline-md text-primary font-bold">Achievements</h2>
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((a) => (
          <div
            key={a.id}
            className={`bg-surface-container-lowest border border-surface-container-high rounded-2xl p-4 flex flex-col gap-2 ${
              a.unlocked ? '' : 'opacity-60 grayscale'
            }`}
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
              a.unlocked ? 'bg-secondary-container text-primary' : 'bg-surface-container-high text-on-surface-variant'
            }`}>
              <Icon name={a.icon} className="" />
            </div>
            <h3 className="font-title-md text-title-md text-primary font-bold text-sm">{a.name}</h3>
            <p className="text-xs text-on-surface-variant">{a.desc}</p>
            <div className="mt-1">
              <ProgressBar value={a.progress || 0} color={a.unlocked ? 'bg-secondary' : 'bg-surface-container-high'} />
              <span className="text-[10px] text-on-surface-variant mt-1 block">{a.progressValue || 0} / {a.progressTarget || 1}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-headline-md text-headline-md text-primary font-bold">Leaderboards</h2>
      <div>
        <div className="flex gap-2 mb-3">
          {['individual', 'neighborhood'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-all ${
                tab === t ? 'bg-secondary-container text-primary' : 'bg-surface-container-high text-on-surface-variant'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <Card>
          <div className="flex flex-col gap-3">
            {leaderData.map((entry) => (
              <div key={entry.name} className={`flex items-center gap-3 rounded-xl p-3 ${
                entry.name.toLowerCase() === (user?.first_name || '').toLowerCase() || entry.rank <= 3 ? 'bg-secondary-container/30' : ''
              }`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  entry.rank === 1 ? 'bg-[#fef3c7] text-amber-700' :
                  entry.rank === 2 ? 'bg-surface-container-high text-on-surface-variant' :
                  entry.rank === 3 ? 'bg-[#d97706]/20 text-[#92400e]' :
                  'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {entry.rank}
                </span>
                <span className="flex-1 font-bold text-on-surface-variant">{entry.name}</span>
                <span className="font-bold text-primary">{entry.points.toLocaleString()} pts</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
