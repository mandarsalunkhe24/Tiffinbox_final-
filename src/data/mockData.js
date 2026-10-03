// Pune Areas & Pincodes
export const PUNE_AREAS = [
  { id: 'kothrud', name: 'Kothrud', pincode: '411038', zone: 'West Pune', landmark: 'MIT College / Karve Road' },
  { id: 'hinjewadi', name: 'Hinjewadi', pincode: '411057', zone: 'North-West Tech Hub', landmark: 'Phase 1, 2 & 3 IT Parks' },
  { id: 'baner', name: 'Baner', pincode: '411045', zone: 'West Corridor', landmark: 'High Street / Balewadi' },
  { id: 'viman-nagar', name: 'Viman Nagar', pincode: '411014', zone: 'East Pune', landmark: 'Phoenix Mall / WeWork' },
  { id: 'magarpatta', name: 'Magarpatta City', pincode: '411028', zone: 'South-East IT City', landmark: 'Cybercity Towers' },
];

export const UNSUPPORTED_SAMPLE_PINCODES = ['411001', '411002', '411005', '411042'];

// Sample Cooks in Pune
export const INITIAL_COOKS = [
  {
    id: 'cook-1',
    name: "Sunita Tai's Kitchen",
    owner: 'Sunita Joshi',
    tagline: 'Authentic Maharashtrian Ghar Ka Khana with love',
    rating: 4.9,
    reviewCount: 342,
    pricePerMeal: 110,
    areasServed: ['kothrud', 'hinjewadi', 'baner'],
    pincodes: ['411038', '411057', '411045'],
    isVegOnly: true,
    cuisineType: 'Maharashtrian & North Indian',
    fssaiLicense: 'FSSAI #21523019001429',
    experienceYears: 12,
    kitchenScore: '98% Hygiene Grade A+',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
    specialty: 'Jowar Bhakri, Shengdana Chutney, Varan Bhat & Gulab Jamun',
    dailyCapacity: 60,
    currentBooked: 42,
    menu: {
      monday: {
        title: 'Varan Bhat & Batata Bhaji Thali',
        isVeg: true,
        items: ['Varan (Tuvar Dal)', 'Indrayani Rice', 'Batata Sukhi Bhaji', '3 Chapati with Ghee', 'Khamang Kakdi Salad', 'Gulab Jamun'],
        calories: '540 kcal'
      },
      tuesday: {
        title: 'Sev Bhaji & Dal Tadka Feast',
        isVeg: true,
        items: ['Khandeshi Sev Bhaji', 'Dal Fry', 'Jeera Rice', '3 Phulka Roti', 'Lemon & Onion Pickle'],
        calories: '580 kcal'
      },
      wednesday: {
        title: 'Pithla Bhakri Maharashtrian Classic',
        isVeg: true,
        items: ['Zunka Pithla', '2 Fresh Jowar Bhakri', 'Mirchi Thecha', 'Kanda Bhaji', 'Solkadhi Drink'],
        calories: '610 kcal'
      },
      thursday: {
        title: 'Matki Usal & Roti Combo',
        isVeg: true,
        items: ['Sprouted Matki Usal', 'Katachi Amti', 'Steamed Rice', '3 Soft Chapati', 'Curd'],
        calories: '520 kcal'
      },
      friday: {
        title: 'Paneer Butter Masala Special',
        isVeg: true,
        items: ['Paneer Makhani', 'Peas Pulao', 'Dal Palak', '3 Ghee Phulka', 'Moong Dal Halwa'],
        calories: '660 kcal'
      },
      saturday: {
        title: 'Chole Masala & Jeera Rice Delight',
        isVeg: true,
        items: ['Punjabi Chole Masala', 'Steamed Jeera Rice', '3 Puri or Chapati', 'Boondi Raita'],
        calories: '630 kcal'
      },
      sunday: {
        title: 'Weekend Festive Thali',
        isVeg: true,
        items: ['Puran Poli with Tupt', 'Katachi Amti', 'Batata Vada', 'Rice', 'Papad & Koshimbir'],
        calories: '720 kcal'
      }
    }
  },
  {
    id: 'cook-2',
    name: 'Patil Ghar Ka Khana',
    owner: 'Anand & Rekha Patil',
    tagline: 'Homestyle North Indian & Kolhapuri specialties',
    rating: 4.8,
    reviewCount: 289,
    pricePerMeal: 120,
    areasServed: ['hinjewadi', 'baner'],
    pincodes: ['411057', '411045'],
    isVegOnly: false,
    cuisineType: 'North Indian & Maharashtrian',
    fssaiLicense: 'FSSAI #21524021008711',
    experienceYears: 8,
    kitchenScore: '96% Hygiene Grade A',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    specialty: 'Rajma Chawal, Kolhapuri Chicken Curry, Dal Makhani',
    dailyCapacity: 50,
    currentBooked: 38,
    menu: {
      monday: {
        title: 'Homestyle Rajma Chawal & Phulka',
        isVeg: true,
        items: ['Jammu Rajma Masala', 'Basmati Steamed Rice', '3 Tawa Phulkas', 'Green Salad & Achaar'],
        calories: '590 kcal'
      },
      tuesday: {
        title: 'Mix Veg Korma & Dal Fry',
        isVeg: true,
        items: ['Homestyle Mix Vegetable Korma', 'Yellow Dal Tadka', 'Jeera Rice', '3 Soft Roti'],
        calories: '530 kcal'
      },
      wednesday: {
        title: 'Kolhapuri Chicken Curry / Paneer Kolhapuri',
        isVeg: false,
        items: ['Kolhapuri Chicken Curry (or Paneer)', 'Tambda Rassa', 'Indrayani Rice', '3 Chapati'],
        calories: '640 kcal'
      },
      thursday: {
        title: 'Aloo Gobi Adraki & Dal Palak',
        isVeg: true,
        items: ['Dhabastyle Aloo Gobi', 'Palak Dal', 'Steamed Rice', '3 Phulka', 'Cucumber Raita'],
        calories: '510 kcal'
      },
      friday: {
        title: 'Dal Makhani & Shahi Pulao',
        isVeg: true,
        items: ['Slow-cooked Dal Makhani', 'Veg Shahi Pulao', '3 Butter Roti', 'Gulab Jamun'],
        calories: '670 kcal'
      },
      saturday: {
        title: 'Desi Chicken Thali / Kadhai Paneer',
        isVeg: false,
        items: ['Chicken Sukka / Kadhai Paneer', 'Dal Tadka', 'Jeera Rice', '3 Chapati'],
        calories: '620 kcal'
      },
      sunday: {
        title: 'Dum Biryani Feast',
        isVeg: false,
        items: ['Hyderabadi Dum Biryani (Chicken/Veg)', 'Mirchi Ka Salan', 'Burani Raita'],
        calories: '710 kcal'
      }
    }
  },
  {
    id: 'cook-3',
    name: 'Meera Kitchen',
    owner: 'Meera Kulkarni',
    tagline: 'Simple, satvik & wholesome office meals',
    rating: 4.95,
    reviewCount: 412,
    pricePerMeal: 105,
    areasServed: ['viman-nagar', 'magarpatta'],
    pincodes: ['411014', '411028'],
    isVegOnly: true,
    cuisineType: 'Pure Veg & Satvik Home Food',
    fssaiLicense: 'FSSAI #21522018003310',
    experienceYears: 15,
    kitchenScore: '99% Hygiene Grade A+',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    specialty: 'Zero excess oil, healthy sprout bowls, Methi Thepla & Dal Baati',
    dailyCapacity: 55,
    currentBooked: 47,
    menu: {
      monday: {
        title: 'Gujarati-Maharashtrian Sattvic Thali',
        isVeg: true,
        items: ['Kadhi Khichdi with Ghee', 'Batata Nu Shaak', '3 Methi Thepla', 'Chhundo Chutney'],
        calories: '490 kcal'
      },
      tuesday: {
        title: 'Bhindi Masala & Panchratna Dal',
        isVeg: true,
        items: ['Crispy Bhindi Masala', '5-Lentil Dal', 'Brown Rice option', '3 Multigrain Phulka'],
        calories: '480 kcal'
      },
      wednesday: {
        title: 'Sprout Usal & Phulka Thali',
        isVeg: true,
        items: ['Organic Moong Sprout Usal', 'Gujarati Dal', 'Steamed Rice', '3 Chapati', 'Carrot Salad'],
        calories: '460 kcal'
      },
      thursday: {
        title: 'Lauki Kofta Light Curry & Jeera Rice',
        isVeg: true,
        items: ['Steamed Lauki Kofta Curry', 'Dal Tadka', 'Jeera Rice', '3 Soft Phulka'],
        calories: '500 kcal'
      },
      friday: {
        title: 'Paneer Bhurji & Dal Fry',
        isVeg: true,
        items: ['Fresh Cottage Cheese Bhurji', 'Moong Dal Tadka', 'Jeera Rice', '3 Ghee Phulka', 'Kheer'],
        calories: '560 kcal'
      },
      saturday: {
        title: 'Rajasthani Dal Baati Churma (Light)',
        isVeg: true,
        items: ['Panchmel Dal', '2 Baked Baatis with Cow Ghee', 'Gatte Ki Sabzi', 'Churma Treat'],
        calories: '680 kcal'
      },
      sunday: {
        title: 'Sunday special Khichdi & Kadi',
        isVeg: true,
        items: ['Dry Fruit Vaghareli Khichdi', 'Kadhi', 'Ringna no Olo (Baingan Bharta)', 'Papad'],
        calories: '530 kcal'
      }
    }
  }
];

// Initial demo subscription for user Rohan Deshmukh
export const INITIAL_USER = {
  name: 'Rohan Deshmukh',
  phone: '9823012345',
  email: 'rohan.deshmukh@pune-tech.com',
  area: 'Hinjewadi',
  pincode: '411057',
  address: 'Tower 4, 6th Floor, Quadron Business Park, Hinjewadi Phase 2, Pune',
  dietPreference: 'Veg with Paneer / Occasional Chicken'
};

// Generate calendar days for October 2026 (or current demo month)
export const generateDemoCalendar = (totalDays = 20) => {
  const days = [];
  const currentDay = 14; // Today is Oct 14 in demo simulation
  
  for (let i = 1; i <= 31; i++) {
    // 2026-10-01 was a Thursday (day 4)
    const dayOfWeek = (i + 3) % 7; 
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
    const dateStr = `2026-10-${i.toString().padStart(2, '0')}`;
    
    let status = 'none';
    if (isWeekend) {
      status = 'weekend';
    } else if (i < currentDay) {
      if (i === 6) status = 'skipped';
      else if (i === 8 || i === 9) status = 'paused';
      else status = 'delivered';
    } else if (i === currentDay) {
      status = 'delivered';
    } else if (i <= 28) {
      status = 'upcoming';
    } else {
      status = 'none';
    }

    days.push({
      dayNumber: i,
      date: dateStr,
      isWeekend,
      status, // 'delivered' | 'upcoming' | 'paused' | 'skipped' | 'weekend' | 'none'
    });
  }
  return days;
};

export const INITIAL_SUBSCRIPTION = {
  id: 'SUB-2026-8819',
  cookId: 'cook-1',
  cookName: "Sunita Tai's Kitchen",
  planType: 'monthly', // 'weekly' (5) | 'monthly' (20) | 'custom'
  totalMealDays: 20,
  mealsUsed: 7,
  dailyRate: 110,
  startDate: '2026-10-01',
  endDate: '2026-10-28',
  status: 'Active', // 'Draft' | 'PendingPayment' | 'Active' | 'Paused' | 'Expired' | 'Cancelled' | 'Refunded'
  mealType: 'Pure Veg',
  deliverySlot: 'Lunch (12:30 PM - 1:30 PM)',
  pauseDaysUsed: 2, // Max 14
  maxPauseDays: 14,
  skipsUsed: 1, // Max 4 for monthly, 1 for weekly
  maxSkips: 4,
  pauseHistory: [
    { from: '2026-10-08', to: '2026-10-09', days: 2, reason: 'Work from home' }
  ],
  skipHistory: [
    { date: '2026-10-06', reason: 'Team lunch outing', credited: true }
  ],
  calendarDays: generateDemoCalendar(),
  payment: {
    transactionId: 'TXN-PUN-982187',
    method: 'UPI (Google Pay)',
    amount: 2200,
    paidAt: '2026-09-30T10:15:00Z',
    status: 'PAID'
  }
};

// Initial orders manifest for Cook
export const INITIAL_COOK_ORDERS = [
  {
    id: 'ORD-101',
    subscriberName: 'Rohan Deshmukh (You)',
    phone: '+91 98230 12345',
    area: 'Hinjewadi Phase 2',
    address: 'Tower 4, Fl 6, Quadron Business Park',
    mealType: 'Pure Veg Thali',
    specialNote: 'Extra roasted papad, low oil',
    status: 'Ready for Pickup', // 'Preparing' | 'Ready for Pickup' | 'Delivered'
    isPaused: false,
    isSkipped: false
  },
  {
    id: 'ORD-102',
    subscriberName: 'Priya Shinde',
    phone: '+91 98221 44552',
    area: 'Hinjewadi Phase 1',
    address: 'Wipro Circle, Bld 3, Desk 42',
    mealType: 'Pure Veg Thali',
    specialNote: 'No onion in salad',
    status: 'Out for Delivery',
    isPaused: false,
    isSkipped: false
  },
  {
    id: 'ORD-103',
    subscriberName: 'Amol Kadam',
    phone: '+91 97654 33211',
    area: 'Kothrud',
    address: 'Near Vanaz Corner, Paud Road',
    mealType: 'Maharashtrian Thali',
    specialNote: 'Mild spice',
    status: 'Delivered',
    isPaused: false,
    isSkipped: false
  },
  {
    id: 'ORD-104',
    subscriberName: 'Tanvi Joshi',
    phone: '+91 98901 88776',
    area: 'Baner',
    address: 'Pan Card Club Road, Pune',
    mealType: 'Pure Veg Thali',
    specialNote: 'Leave with reception',
    status: 'Preparing',
    isPaused: false,
    isSkipped: false
  },
  {
    id: 'ORD-105',
    subscriberName: 'Siddharth Patil',
    phone: '+91 94220 11998',
    area: 'Hinjewadi Phase 3',
    address: 'Tech Mahindra SEZ',
    mealType: 'Pure Veg Thali',
    specialNote: 'Warm bag preferred',
    status: 'Paused',
    isPaused: true,
    isSkipped: false
  },
  {
    id: 'ORD-106',
    subscriberName: 'Kavita Gore',
    phone: '+91 98600 55432',
    area: 'Kothrud',
    address: 'Ideal Colony, Flat 302',
    mealType: 'Pure Veg Thali',
    specialNote: 'Skip today',
    status: 'Skipped',
    isPaused: false,
    isSkipped: true
  },
  {
    id: 'ORD-107',
    subscriberName: 'Nikhil Rathi',
    phone: '+91 98811 77223',
    area: 'Baner',
    address: 'Veerbhadra Nagar, Apt 5',
    mealType: 'Maharashtrian Thali',
    specialNote: 'Call on arrival',
    status: 'Paused',
    isPaused: true,
    isSkipped: false
  }
];

// Initial cook applications for Admin review
export const INITIAL_COOK_APPLICATIONS = [
  {
    id: 'APP-501',
    applicantName: 'Aarti Joshi',
    kitchenName: 'Aarti Swad Kendra',
    area: 'Kothrud',
    fssaiNumber: '21524021009844',
    experienceYears: 6,
    hygieneAuditScore: '94% (Grade A)',
    sampleTastingRating: 4.8,
    specialty: 'Konkani Brahmin Vegetarian & Ukadiche Modak',
    status: 'Pending', // 'Pending' | 'Approved' | 'Rejected'
    appliedDate: '2026-09-24',
    dailyTargetCapacity: 45
  },
  {
    id: 'APP-502',
    applicantName: 'Vaishali Shinde',
    kitchenName: 'Mauli Tiffin Services',
    area: 'Hinjewadi',
    fssaiNumber: '21524018004512',
    experienceYears: 9,
    hygieneAuditScore: '97% (Grade A+)',
    sampleTastingRating: 4.9,
    specialty: 'Healthy Multigrain Chapati, Dal & Seasonal Veg',
    status: 'Approved',
    appliedDate: '2026-09-20',
    dailyTargetCapacity: 70
  },
  {
    id: 'APP-503',
    applicantName: 'Suresh & Lata Salve',
    kitchenName: 'Pune Rasoi',
    area: 'Viman Nagar',
    fssaiNumber: 'Applied / In Process',
    experienceYears: 3,
    hygieneAuditScore: '78% (Requires Re-inspection)',
    sampleTastingRating: 3.9,
    specialty: 'North Indian Meals',
    status: 'Pending',
    appliedDate: '2026-09-27',
    dailyTargetCapacity: 30
  }
];

// Initial subscribers table for Admin
export const INITIAL_ADMIN_SUBSCRIBERS = [
  {
    id: 'SUB-2026-8819',
    customerName: 'Rohan Deshmukh',
    phone: '+91 98230 12345',
    area: 'Hinjewadi',
    cookAssigned: "Sunita Tai's Kitchen",
    planType: 'Monthly (20 Meals)',
    amount: 2200,
    startDate: '2026-10-01',
    endDate: '2026-10-28',
    status: 'Active',
    paymentStatus: 'PAID'
  },
  {
    id: 'SUB-2026-8820',
    customerName: 'Priya Shinde',
    phone: '+91 98221 44552',
    area: 'Hinjewadi',
    cookAssigned: "Sunita Tai's Kitchen",
    planType: 'Monthly (20 Meals)',
    amount: 2200,
    startDate: '2026-10-01',
    endDate: '2026-10-26',
    status: 'Active',
    paymentStatus: 'PAID'
  },
  {
    id: 'SUB-2026-8821',
    customerName: 'Kunal Verma',
    phone: '+91 99211 98765',
    area: 'Baner',
    cookAssigned: 'Patil Ghar Ka Khana',
    planType: 'Weekly (5 Meals)',
    amount: 600,
    startDate: '2026-10-05',
    endDate: '2026-10-09',
    status: 'Active',
    paymentStatus: 'PAID'
  },
  {
    id: 'SUB-2026-8822',
    customerName: 'Neha Chitale',
    phone: '+91 98500 33441',
    area: 'Kothrud',
    cookAssigned: "Sunita Tai's Kitchen",
    planType: 'Monthly (20 Meals)',
    amount: 2200,
    startDate: '2026-09-15',
    endDate: '2026-10-15',
    status: 'Paused',
    paymentStatus: 'PAID'
  },
  {
    id: 'SUB-2026-8823',
    customerName: 'Vikram Sethi',
    phone: '+91 97632 11009',
    area: 'Viman Nagar',
    cookAssigned: 'Meera Kitchen',
    planType: 'Monthly (20 Meals)',
    amount: 2100,
    startDate: '2026-09-01',
    endDate: '2026-09-28',
    status: 'Expired',
    paymentStatus: 'PAID'
  },
  {
    id: 'SUB-2026-8824',
    customerName: 'Aditi Deshpande',
    phone: '+91 98234 55667',
    area: 'Magarpatta',
    cookAssigned: 'Meera Kitchen',
    planType: 'Custom (12 Meals)',
    amount: 1260,
    startDate: '2026-10-02',
    endDate: '2026-10-18',
    status: 'Refunded',
    paymentStatus: 'REFUNDED'
  }
];

// Initial Alerts
export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'payment',
    title: 'Payment Successful',
    message: '₹2,200 received via UPI for Monthly Plan (20 Meals). Sunita Tai is preparing your onboarding!',
    time: '2 hours ago',
    read: false
  },
  {
    id: 'notif-2',
    type: 'pause',
    title: 'Pause Confirmed',
    message: 'Your tiffin was paused for 2 days. Your plan validity has been automatically extended to Oct 28.',
    time: 'Yesterday',
    read: false
  },
  {
    id: 'notif-3',
    type: 'reminder',
    title: 'Cut-off Reminder for Tomorrow',
    message: 'Remember: Pause or skip requests for tomorrow must be placed before 9:00 PM tonight.',
    time: '5 hours ago',
    read: true
  },
  {
    id: 'notif-4',
    type: 'cook',
    title: 'Festive Special This Friday!',
    message: "Sunita Tai's Kitchen will be serving special hot Puran Poli and Katachi Amti this Friday.",
    time: '2 days ago',
    read: true
  }
];
