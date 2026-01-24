
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      queryFn: () => ({
        data: {
          totalUsers: 12547,
          regularUsers: 12547,
          businessUsers: 12547,
          platformEarnings: 12547,
          liveNow: 123
        }
      })
    }),

    getStreamers: builder.query({
      queryFn: () => ({
        data: Array(10).fill(null).map((_, i) => ({
          id: '1223' + i,
          name: i % 2 === 0 ? 'Mille Jacob' : 'Alex Rivera',
          location: 'New York, USA',
          featherLevel: 2,
          avgViewers: 2457,
          totalFeather: 1200,
          totalCoins: 12,
          flagged: 0,
          followers: 122,
          following: 56,
          friends: 56,
          subscribers: 56,
          totalEarnings: '$200.87',
          lastStream: i % 2 === 0 ? '2 hrs Ago' : '1 Day Ago'
        }))
      })
    }),

    getBusinessUsers: builder.query({
      queryFn: () => ({
        data: Array(8).fill(null).map((_, i) => ({
          id: 'BIZ-' + (500 + i),
          company: i % 2 === 0 ? 'TechFlow Media' : 'Glow Agency',
          industry: i % 2 === 0 ? 'Digital Content' : 'Marketing',
          plan: i % 3 === 0 ? 'Enterprise' : 'Pro',
          revenue: '$' + (i * 1200 + 5000).toLocaleString(),
          status: 'Verified',
          joined: '2024-11-12'
        }))
      })
    }),

    getApprovalBusiness: builder.query({
      queryFn: () => ({
        data: Array(5).fill(null).map((_, i) => ({
          id: 'APP-' + (900 + i),
          name: i % 2 === 0 ? 'Starlight Talent' : 'Apex Streaming Group',
          email: 'contact@' + (i % 2 === 0 ? 'starlight' : 'apex') + '.com',
          date: '2025-05-20',
          type: 'Agency',
          status: 'Pending'
        }))
      })
    }),

    getApprovalMarketplace: builder.query({
      queryFn: () => ({
        data: Array(4).fill(null).map((_, i) => ({
          id: 'MKT-APP-' + (700 + i),
          itemName: i % 2 === 0 ? 'Neon Wings Effect' : 'Super Rocket Gift',
          creator: 'AssetStudio_' + i,
          price: (i + 5) * 50 + ' Coins',
          previewUrl: `https://picsum.photos/100/100?seed=asset${i}`,
          status: 'Pending'
        }))
      })
    }),

    getLiveStreams: builder.query({
      queryFn: () => ({
        data: Array(10).fill(null).map((_, i) => ({
          id: '1223' + i,
          name: 'Graham Jackson',
          title: 'IRL Stream | Streaming from Las Vegas | Doing QA Sessions',
          category: 'Lifestyle',
          currentViewers: 10002,
          peakViews: 15621,
          flagged: 2
        }))
      })
    }),

    getMessages: builder.query({
      queryFn: () => ({
        data: [
          { id: '1', name: 'Florencio Dorrance', text: 'woohoooo', time: '24m', avatar: 'https://picsum.photos/40/40?1', online: true },
          { id: '2', name: 'Elmer Laverty', text: 'Haha oh man 🔥', time: '12m', avatar: 'https://picsum.photos/40/40?2', online: false },
          { id: '3', name: 'Lavern Laboy', text: "Haha that's terrifying 😂", time: '1h', avatar: 'https://picsum.photos/40/40?3', online: true }
        ]
      })
    }),

    getEarnings: builder.query({
      queryFn: () => ({
        data: Array(8).fill(null).map((_, i) => ({
          id: 'TRX-' + (1000 + i),
          date: '2025-05-' + (10 + i),
          user: i % 2 === 0 ? 'John Doe' : 'Jane Smith',
          amount: (Math.random() * 500 + 50).toFixed(2),
          method: i % 3 === 0 ? 'PayPal' : 'Stripe',
          status: 'Completed'
        }))
      })
    }),

    getChallenges: builder.query({
      queryFn: () => ({
        data: [
          { id: 'CHL-001', title: 'Weekend Rush', reward: '500 Coins', participants: 1240, status: 'Active', end: '2 days' },
          { id: 'CHL-002', title: 'Newbie Streamer Boost', reward: 'Feather Level UP', participants: 450, status: 'Active', end: '5 days' },
          { id: 'CHL-003', title: 'Gifts Marathon', reward: '$1000 Pool', participants: 8900, status: 'Expired', end: 'Ended' }
        ]
      })
    }),

    getMarketplaceItems: builder.query({
      queryFn: () => ({
        data: Array(6).fill(null).map((_, i) => ({
          id: 'ITM-' + i,
          name: i % 2 === 0 ? 'Epic Dragon Gift' : 'Golden Crown',
          category: 'Virtual Gift',
          price: (i + 1) * 100 + ' Coins',
          sales: 450 + i * 20,
          status: 'Approved'
        }))
      })
    }),

    getCategories: builder.query({
      queryFn: () => ({
        data: [
          { id: 'CAT-1', name: 'Gaming', activeStreams: 452, viewers: '125K', color: 'bg-indigo-50 text-indigo-600' },
          { id: 'CAT-2', name: 'Music', activeStreams: 124, viewers: '42K', color: 'bg-pink-50 text-pink-600' },
          { id: 'CAT-3', name: 'IRL / Lifestyle', activeStreams: 842, viewers: '230K', color: 'bg-green-50 text-green-600' },
          { id: 'CAT-4', name: 'Art & Creative', activeStreams: 64, viewers: '12K', color: 'bg-orange-50 text-orange-600' },
          { id: 'CAT-5', name: 'ASMR', activeStreams: 32, viewers: '8.5K', color: 'bg-purple-50 text-purple-600' }
        ]
      })
    }),

    getFeedback: builder.query({
      queryFn: () => ({
        data: Array(5).fill(null).map((_, i) => ({
          id: 'FB-' + i,
          user: 'User_' + i,
          rating: 5 - (i % 2),
          comment: i % 2 === 0
            ? 'The streaming quality is amazing! Best platform so far.'
            : 'Great app but needs more payment options.',
          date: '1 hour ago'
        }))
      })
    }),

    getReports: builder.query({
      queryFn: () => ({
        data: [
          { id: 'REP-101', target: 'Mille Jacob', reason: 'Inappropriate Language', severity: 'Medium', reporter: 'User_99', status: 'Pending' },
          { id: 'REP-102', target: 'Alex Rivera', reason: 'Copyright Infringement', severity: 'High', reporter: 'Copyright_Bot', status: 'Resolved' },
          { id: 'REP-103', target: 'John_Stream', reason: 'Spamming', severity: 'Low', reporter: 'Mod_1', status: 'Pending' }
        ]
      })
    }),

    getTopPerformers: builder.query({
      queryFn: () => ({
        data: {
          spotlight: { name: 'Mille Jacob', earnings: '$45,200', viewers: '25.4K', growth: '+24%' },
          list: [
            { rank: 1, name: 'Alex Rivera', earnings: '$12,400', viewers: '15.2K', category: 'Gaming' },
            { rank: 2, name: 'Sasha Grey', earnings: '$10,800', viewers: '12.1K', category: 'Music' },
            { rank: 3, name: 'Tony Vlog', earnings: '$9,200', viewers: '9.4K', category: 'Lifestyle' }
          ]
        }
      })
    })
  })
});

export const {
  useGetDashboardStatsQuery,
  useGetStreamersQuery,
  useGetBusinessUsersQuery,
  useGetApprovalBusinessQuery,
  useGetApprovalMarketplaceQuery,
  useGetLiveStreamsQuery,
  useGetMessagesQuery,
  useGetEarningsQuery,
  useGetChallengesQuery,
  useGetMarketplaceItemsQuery,
  useGetCategoriesQuery,
  useGetFeedbackQuery,
  useGetReportsQuery,
  useGetTopPerformersQuery
} = apiService;
