import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, Target, CreditCard, PiggyBank, Shield, AlertCircle, ArrowRight, BarChart3, Clock } from 'lucide-react';

const BankDashboard = () => {
  const [selectedSegment, setSelectedSegment] = useState(null);

  // Mock bank data
  const bankMetrics = {
    totalUsers: 47234,
    avgHealthScore: 71,
    totalDepositIncrease: '€12.4M',
    productUptakeIncrease: '+42%',
    overdraftReduction: '-68%',
    customerSatisfaction: '+31%',
    retentionImprovement: '+2.3x'
  };

  // Customer segments based on health scores
  const customerSegments = [
    {
      id: 'premium',
      name: 'Premium Ready',
      count: 8421,
      scoreRange: '85-100',
      color: 'green',
      opportunity: 'Premium Credit Cards',
      potentialRevenue: '€420K',
      conversionRate: '35%',
      description: 'Excellent financial health. Ready for premium products.',
      characteristics: [
        'Consistent savings pattern',
        'Low impulse spending',
        'Excellent cash flow'
      ]
    },
    {
      id: 'growth',
      name: 'Growth Potential',
      count: 15603,
      scoreRange: '70-84',
      color: 'blue',
      opportunity: 'Investment Products',
      potentialRevenue: '€780K',
      conversionRate: '28%',
      description: 'Good financial habits. Ready to grow wealth.',
      characteristics: [
        'Improving savings rate',
        'Moderate spending control',
        'Positive trend'
      ]
    },
    {
      id: 'building',
      name: 'Habit Building',
      count: 18456,
      scoreRange: '50-69',
      color: 'yellow',
      opportunity: 'Financial Wellness Tools',
      potentialRevenue: '€280K',
      conversionRate: '22%',
      description: 'Developing healthy habits. Needs guidance.',
      characteristics: [
        'Inconsistent savings',
        'Impulse spending present',
        'High engagement opportunity'
      ]
    },
    {
      id: 'support',
      name: 'Needs Support',
      count: 4754,
      scoreRange: '0-49',
      color: 'red',
      opportunity: 'Overdraft Protection',
      potentialRevenue: '€95K',
      conversionRate: '45%',
      description: 'Struggling financially. Intervention needed.',
      characteristics: [
        'High overdraft risk',
        'Poor spending patterns',
        'Retention risk'
      ]
    }
  ];

  // Product recommendation engine results
  const productOpportunities = [
    {
      product: 'Premium Credit Card',
      targetSegment: 'Premium Ready',
      readyCustomers: 8421,
      expectedUptake: 2947,
      avgRevenue: '€142',
      totalRevenue: '€418K',
      timing: 'Immediate',
      icon: CreditCard,
      color: 'purple'
    },
    {
      product: 'High-Yield Savings',
      targetSegment: 'Growth Potential',
      readyCustomers: 15603,
      expectedUptake: 4369,
      avgRevenue: '€89',
      totalRevenue: '€389K',
      timing: 'Next 30 days',
      icon: PiggyBank,
      color: 'green'
    },
    {
      product: 'Overdraft Protection',
      targetSegment: 'Needs Support',
      readyCustomers: 4754,
      expectedUptake: 2139,
      avgRevenue: '€44',
      totalRevenue: '€94K',
      timing: 'Urgent',
      icon: Shield,
      color: 'red'
    }
  ];

  // ROI metrics
  const roiMetrics = [
    {
      metric: 'Customer Deposits',
      before: '€284M',
      after: '€296.4M',
      change: '+€12.4M',
      changePercent: '+4.4%',
      icon: DollarSign,
      color: 'green'
    },
    {
      metric: 'Product Uptake',
      before: '18.2%',
      after: '25.8%',
      change: '+7.6pp',
      changePercent: '+42%',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      metric: 'Overdraft Incidents',
      before: '12,450',
      after: '3,984',
      change: '-8,466',
      changePercent: '-68%',
      icon: AlertCircle,
      color: 'yellow'
    },
    {
      metric: 'Customer NPS',
      before: '42',
      after: '55',
      change: '+13',
      changePercent: '+31%',
      icon: Users,
      color: 'purple'
    }
  ];

  const getColorClass = (color) => {
    const colors = {
      green: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400',
      blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
      yellow: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-400',
      red: 'from-red-500/20 to-pink-500/20 border-red-500/30 text-red-400',
      purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400'
    };
    return colors[color] || colors.green;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Bank Dashboard</h1>
          <p className="text-gray-400">Real-time insights from FinSense integration</p>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg">
          <div className="text-sm text-gray-400">Your Bank</div>
          <div className="text-lg font-bold text-green-400">Demo Bank</div>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Active Users</span>
          </div>
          <div className="text-2xl font-bold text-white">{bankMetrics.totalUsers.toLocaleString()}</div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Avg Health Score</span>
          </div>
          <div className="text-2xl font-bold text-white">{bankMetrics.avgHealthScore}/100</div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Deposit Growth</span>
          </div>
          <div className="text-2xl font-bold text-white">{bankMetrics.totalDepositIncrease}</div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">Product Uptake</span>
          </div>
          <div className="text-2xl font-bold text-white">{bankMetrics.productUptakeIncrease}</div>
        </div>
      </div>

      {/* Customer Segments */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Customer Segments by Health Score</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {customerSegments.map((segment) => {
            const isSelected = selectedSegment === segment.id;
            
            return (
              <button
                key={segment.id}
                onClick={() => setSelectedSegment(isSelected ? null : segment.id)}
                className={`bg-gradient-to-br ${getColorClass(segment.color)} backdrop-blur-sm border rounded-xl p-5 text-left transition-all hover:scale-105 ${
                  isSelected ? 'ring-2 ring-offset-2 ring-offset-gray-950' : ''
                }`}
              >
                <div className="text-sm text-gray-400 mb-1">{segment.scoreRange}</div>
                <div className="text-xl font-bold text-white mb-1">{segment.name}</div>
                <div className="text-3xl font-bold mb-3">{segment.count.toLocaleString()}</div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Opportunity:</span>
                    <span className="font-semibold">{segment.opportunity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Revenue:</span>
                    <span className="font-bold">{segment.potentialRevenue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Conv. Rate:</span>
                    <span className="font-semibold">{segment.conversionRate}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-white/10 animate-slideIn">
                    <p className="text-sm text-gray-300 mb-3">{segment.description}</p>
                    <div className="space-y-1">
                      {segment.characteristics.map((char, idx) => (
                        <div key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-current mt-1.5" />
                          <span>{char}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Opportunities */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">AI-Powered Product Recommendations</h2>
        <div className="space-y-3">
          {productOpportunities.map((opportunity, idx) => {
            const Icon = opportunity.icon;
            
            return (
              <div
                key={idx}
                className={`bg-gradient-to-br ${getColorClass(opportunity.color)} backdrop-blur-sm border rounded-xl p-5`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${getColorClass(opportunity.color)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div>
                      <div className="text-lg font-bold text-white mb-1">{opportunity.product}</div>
                      <div className="text-sm text-gray-400">Target: {opportunity.targetSegment}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{opportunity.totalRevenue}</div>
                    <div className="text-sm text-gray-400">potential revenue</div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-sm text-gray-400">Ready Now</div>
                    <div className="text-lg font-bold text-white">{opportunity.readyCustomers.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Expected Sales</div>
                    <div className="text-lg font-bold text-white">{opportunity.expectedUptake.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Avg Revenue</div>
                    <div className="text-lg font-bold text-white">{opportunity.avgRevenue}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Timing</div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <div className="text-sm font-semibold text-white">{opportunity.timing}</div>
                    </div>
                  </div>
                </div>

                <button className="mt-4 w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg py-2 px-4 text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all">
                  Launch Campaign <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ROI Impact */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Return on Investment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roiMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            const isPositive = metric.changePercent.startsWith('+');
            
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${getColorClass(metric.color)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-semibold text-white">{metric.metric}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Before FinSense</div>
                    <div className="text-xl font-bold text-gray-400">{metric.before}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">With FinSense</div>
                    <div className={`text-xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {metric.after}
                    </div>
                  </div>
                </div>

                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  isPositive ? 'bg-green-900/20 border border-green-500/20' : 'bg-red-900/20 border border-red-500/20'
                }`}>
                  <div>
                    <div className="text-sm text-gray-400">Change</div>
                    <div className={`text-lg font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {metric.change}
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.changePercent}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Ready to Transform Your Bank?</h3>
        <p className="text-gray-300 mb-6">
          FinSense delivers measurable ROI through AI-powered financial wellness
        </p>
        <div className="flex items-center justify-center gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-500 hover:to-emerald-500 transition-all">
            Schedule Demo
          </button>
          <button className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all">
            Download Case Study
          </button>
        </div>
      </div>

    </div>
  );
};

export default BankDashboard;