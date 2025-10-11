// scripts/seed.js
require('dotenv').config();

const { connectDB, disconnectDB } = require('../config/db');

// Core models
const User = require('../models/User');
const JobSeekerProfile = require('../models/JobSeekerProfile');
const Company = require('../models/Company');
const Job = require('../models/Job');
const Application = require('../models/Application');

// New models
const Admin = require('../models/Admin');
const SystemSettings = require('../models/SystemSettings');
const SavedJob = require('../models/SavedJob');
const ActivityLog = require('../models/ActivityLog');
const Notification = require('../models/Notification');
const NotificationPreference = require('../models/NotificationPreference');

async function clearAll() {
  console.log('⚠️  Clearing collections...');
  await Promise.all([
    User.deleteMany({}),
    JobSeekerProfile.deleteMany({}),
    Company.deleteMany({}),
    Job.deleteMany({}),
    Application.deleteMany({}),
    Admin.deleteMany({}),
    SystemSettings.deleteMany({}),
    SavedJob.deleteMany({}),
    ActivityLog.deleteMany({}),
    Notification.deleteMany({}),
    NotificationPreference.deleteMany({}),
  ]);
  console.log('✅ Collections cleared.');
}

/** --------------------------
 * Seed helpers (idempotent)
 * ------------------------- */

async function ensureCompany() {
  const email = 'hr@acme.example';

  let company = await Company.findOne({ email }).select('+password');
  if (!company) {
    company = await Company.create({
      email,
      password: 'Acme123!', // hashed by pre('save')
      name: 'Acme Technologies Ltd.',
      website: 'https://acme.example',
      logoUrl: 'https://placehold.co/200x200?text=ACME',
      industry: 'Software',
      size: '51-200',
      about: 'We build scalable web platforms.',
      address: 'Banani, Dhaka',
      verified: true,
    });
    console.log('🏢 Company created:', company.email);
  } else {
    console.log('🏢 Company exists:', company.email);
  }
  return company;
}

async function ensureUser() {
  const email = 'js@example.com';

  let user = await User.findOne({ email }).select('+password');
  if (!user) {
    user = await User.create({
      email,
      password: 'User123!', // hashed by pre('save')
      role: 'jobseeker',
      status: 'active',
    });
    console.log('👤 User created:', user.email);
  } else {
    console.log('👤 User exists:', user.email);
  }
  return user;
}

async function ensureJobSeekerProfile(user) {
  let profile = await JobSeekerProfile.findOne({ user: user._id });
  if (!profile) {
    profile = await JobSeekerProfile.create({
      user: user._id,
      fullName: 'Md. Jahangir Hossain',
      title: 'Frontend Developer',
      about: 'Passionate about building job portals.',
      phone: '+8801XXXXXXXXX',
      address: 'Dhaka, Bangladesh',
      linkedin: 'linkedin.com/in/jahangir',
      avatarUrl: 'https://placehold.co/128x128?text=JH',
      resumeUrl: 'https://example.com/resumes/jahangir.pdf',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      experience: [
        {
          title: 'Frontend Developer',
          company: 'Tech Innovators Inc.',
          years: '2023–Present',
          description: 'Building scalable components and performance optimizations.',
        },
      ],
      education: [
        {
          degree: 'BSc in CSE',
          institution: 'State University',
          years: '2017–2021',
        },
      ],
      visibility: 'public',
    });

    // Link back to user for convenience
    user.profileModel = 'JobSeekerProfile';
    user.profile = profile._id;
    await user.save();

    console.log('🧑‍🎓 Profile created:', profile.fullName);
  } else {
    console.log('🧑‍🎓 Profile exists:', profile.fullName);
  }
  return profile;
}

async function ensureJob(company) {
  const title = 'Frontend Engineer (React)';

  let job = await Job.findOne({ companyId: company._id, title });
  if (!job) {
    job = await Job.create({
      companyId: company._id,
      title,
      description: 'Build rich user experiences with React and Tailwind.',
      requirements: [
        '3+ years experience with React',
        'Strong JavaScript/TypeScript',
        'Experience with REST APIs',
      ],
      employmentType: 'full_time',
      seniority: 'mid',
      salary: { min: 60000, max: 120000, currency: 'BDT' },
      location: { country: 'Bangladesh', city: 'Dhaka', remote: true },
      tags: ['react', 'frontend', 'tailwind', 'javascript'],
      status: 'open',
      publishedAt: new Date(),
    });
    console.log('📄 Job created:', job.title);
  } else {
    console.log('📄 Job exists:', job.title);
  }
  return job;
}

async function ensureApplication(job, user) {
  let application = await Application.findOne({
    jobId: job._id,
    applicantUserId: user._id,
  });
  if (!application) {
    application = await Application.create({
      jobId: job._id,
      applicantUserId: user._id,
      resumeUrl: 'https://example.com/resumes/jahangir.pdf',
      coverLetter:
        'Dear Hiring Team, I am excited to apply for the Frontend Engineer role at Acme...',
      status: 'submitted',
    });
    console.log('📝 Application created:', application._id.toString());
  } else {
    console.log('📝 Application exists:', application._id.toString());
  }
  return application;
}

/** Admin + Settings */

async function ensureAdmin() {
  const email = 'admin@khojthejob.local';

  let admin = await Admin.findOne({ email }).select('+password');
  if (!admin) {
    admin = await Admin.create({
      email,
      password: 'Admin123!', // hashed
      role: 'superadmin',
      status: 'active',
    });
    console.log('🔐 Admin created:', admin.email);
  } else {
    console.log('🔐 Admin exists:', admin.email);
  }
  return admin;
}

async function ensureSystemSettings(admin) {
  const latest = await SystemSettings.findOne({}, {}, { sort: { version: -1, updatedAt: -1 } });
  if (!latest) {
    const settings = await SystemSettings.create({
      version: 1,
      featureFlags: {
        messagingEnabled: true,
        videoCallingEnabled: false,
        notificationsEnabled: true,
        applicationsEnabled: true,
        jobPostingEnabled: true,
        registrationEnabled: true,
        maintenanceMode: false,
      },
      limits: {
        maxAvatarMB: 2,
        maxResumeMB: 10,
        maxMessageAttachments: 5,
        maxJobsPerCompany: 100,
      },
      branding: {
        siteName: 'Khoj The Job',
        defaultCurrency: 'BDT',
        logoUrl: '',
        theme: 'light',
      },
      legal: {
        termsUrl: 'https://example.com/terms',
        privacyUrl: 'https://example.com/privacy',
        contactEmail: 'support@khojthejob.local',
      },
      mail: {
        defaultFrom: 'no-reply@khojthejob.local',
        templates: {
          welcomeUserTemplateId: '',
          welcomeCompanyTemplateId: '',
          applicationReceivedTemplateId: '',
        },
      },
      modifiedBy: admin._id,
      notes: 'Initial settings',
    });
    console.log('⚙️  SystemSettings created: v', settings.version);
    return settings;
  } else {
    console.log('⚙️  SystemSettings exists: v', latest.version);
    return latest;
  }
}

/** Engagement: Saved job, notification prefs, notification, activity logs */

async function ensureSavedJob(user, job) {
  let saved = await SavedJob.findOne({ userId: user._id, jobId: job._id });
  if (!saved) {
    saved = await SavedJob.create({
      userId: user._id,
      jobId: job._id,
      notes: 'Looks interesting! Apply later.',
    });
    console.log('📌 SavedJob created:', saved._id.toString());
  } else {
    console.log('📌 SavedJob exists:', saved._id.toString());
  }
  return saved;
}

async function ensureNotificationPreferences(user, company) {
  // User prefs
  let userPrefs = await NotificationPreference.findOne({ principalId: user._id });
  if (!userPrefs) {
    userPrefs = await NotificationPreference.create({
      principalType: 'user',
      principalModel: 'User',
      principalId: user._id,
      channels: { inapp: true, email: true, push: false, sms: false },
      categories: {
        message: { inapp: true, email: true, push: false, sms: false },
        job: { inapp: true, email: false, push: false, sms: false },
        application: { inapp: true, email: true, push: false, sms: false },
        system: { inapp: true, email: true, push: false, sms: false },
      },
      quietHours: { enabled: false, start: '22:00', end: '07:00', timezone: 'Asia/Dhaka' },
    });
    console.log('🔔 User NotificationPreference created');
  } else {
    console.log('🔔 User NotificationPreference exists');
  }

  // Company prefs
  let companyPrefs = await NotificationPreference.findOne({ principalId: company._id });
  if (!companyPrefs) {
    companyPrefs = await NotificationPreference.create({
      principalType: 'company',
      principalModel: 'Company',
      principalId: company._id,
      channels: { inapp: true, email: true, push: false, sms: false },
      categories: {
        message: { inapp: true, email: true, push: false, sms: false },
        job: { inapp: true, email: false, push: false, sms: false },
        application: { inapp: true, email: true, push: false, sms: false },
        system: { inapp: true, email: true, push: false, sms: false },
      },
      quietHours: { enabled: false, start: '22:00', end: '07:00', timezone: 'Asia/Dhaka' },
    });
    console.log('🔔 Company NotificationPreference created');
  } else {
    console.log('🔔 Company NotificationPreference exists');
  }

  return { userPrefs, companyPrefs };
}

async function ensureNotification(company, user, job, application) {
  const dedupeKey = `application_submitted:${application._id.toString()}:${company._id.toString()}`;

  let notif = await Notification.findOne({
    recipientId: company._id,
    dedupeKey,
  });
  if (!notif) {
    notif = await Notification.create({
      recipientType: 'company',
      recipientModel: 'Company',
      recipientId: company._id,
      actorType: 'user',
      actorModel: 'User',
      actorId: user._id,
      category: 'application',
      type: 'application_submitted',
      title: 'New application received',
      body: `Applicant ${user.email} applied for "${job.title}".`,
      jobId: job._id,
      applicationId: application._id,
      channel: 'inapp',
      status: 'queued',
      dedupeKey,
      important: true,
      data: { salaryMin: job.salary?.min, salaryMax: job.salary?.max },
      sentAt: new Date(),
    });
    console.log('🔔 Notification created:', notif._id.toString());
  } else {
    console.log('🔔 Notification exists:', notif._id.toString());
  }
  return notif;
}

async function ensureActivityLogs(user, company, job, application) {
  const entries = [
    {
      actorType: 'company',
      actorModel: 'Company',
      actorId: company._id,
      action: 'job_created',
      jobId: job._id,
      companyId: company._id,
      metadata: { title: job.title, publishedAt: job.publishedAt },
    },
    {
      actorType: 'user',
      actorModel: 'User',
      actorId: user._id,
      action: 'job_save',
      jobId: job._id,
      userId: user._id,
      metadata: { note: 'Saved from seed' },
    },
    {
      actorType: 'user',
      actorModel: 'User',
      actorId: user._id,
      action: 'job_apply',
      jobId: job._id,
      applicationId: application._id,
      userId: user._id,
      metadata: { status: application.status },
    },
  ];

  for (const e of entries) {
    await ActivityLog.create(e);
  }
  console.log(`🧭 ActivityLog entries created: ${entries.length}`);
}

/** --------------------------
 * Main
 * ------------------------- */
(async () => {
  const args = process.argv.slice(2);
  const shouldClear = args.includes('--clear');

  try {
    await connectDB();

    if (shouldClear) {
      await clearAll();
    }

    const company = await ensureCompany();
    const user = await ensureUser();
    const admin = await ensureAdmin();

    const settings = await ensureSystemSettings(admin);
    const profile = await ensureJobSeekerProfile(user);
    const job = await ensureJob(company);
    const application = await ensureApplication(job, user);

    await ensureSavedJob(user, job);
    await ensureNotificationPreferences(user, company);
    await ensureNotification(company, user, job, application);
    await ensureActivityLogs(user, company, job, application);

    console.log('\n✅ Seed completed.');
    console.table({
      Company: company.email,
      User: user.email,
      Admin: admin.email,
      SettingsVersion: settings.version,
      Profile: profile.fullName,
      Job: job.title,
      ApplicationStatus: application.status,
    });
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exitCode = 1;
  } finally {
    await disconnectDB(); // <-- ensure proper connection close
    console.log('🔌 MongoDB connection closed.');
  }
})();