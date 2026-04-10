import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/layout/Layout';
import ServicePlaceholder from './pages/ServicePlaceholder';

// Portal
const PortalPage = lazy(() => import('./pages/PortalPage'));

// LearnForm
const LearnFormLanding = lazy(() => import('./pages/learnform/LandingPage'));

// LMS
const LmsLayout = lazy(() => import('./components/layout/Layout'));
const HomePage = lazy(() => import('./pages/lms/HomePage'));
const ExplorePage = lazy(() => import('./pages/lms/ExplorePage'));
const CommunityPage = lazy(() => import('./pages/lms/CommunityPage'));
const LearningPathsPage = lazy(() => import('./pages/lms/LearningPathsPage'));
const ProfilePage = lazy(() => import('./pages/lms/ProfilePage'));
const CourseDetailPage = lazy(() => import('./pages/lms/CourseDetailPage'));
const ProjectsPage = lazy(() => import('./pages/lms/ProjectsPage'));
const LeaderboardPage = lazy(() => import('./pages/lms/LeaderboardPage'));
const LmsDashboard = lazy(() => import('./pages/lms/DashboardPage'));
const LmsMyCourses = lazy(() => import('./pages/lms/MyCoursesPage'));
const LmsCertificates = lazy(() => import('./pages/lms/CertificatesPage'));

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-300 border-t-[var(--primary)] rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Routes>
              {/* Portal */}
              <Route path="/" element={<PortalPage />} />

              {/* LearnForm */}
              <Route path="/learnform" element={<LearnFormLanding />} />

              {/* LMS */}
              <Route path="/lms" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="explore" element={<ExplorePage />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="paths" element={<LearningPathsPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="leaderboard" element={<LeaderboardPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="course/:id" element={<CourseDetailPage />} />
                <Route path="dashboard" element={<LmsDashboard />} />
                <Route path="courses" element={<LmsMyCourses />} />
                <Route path="certificates" element={<LmsCertificates />} />
              </Route>

              {/* Service TLA Routes */}
              <Route path="/map" element={<ServicePlaceholder code="MAP" name="Manufacturing AI Platform" desc="생산 공정의 지능화" />} />
              <Route path="/vls" element={<ServicePlaceholder code="VLS" name="Video Lecture System" desc="시공간 제약 없는 교육" />} />
              <Route path="/vas" element={<ServicePlaceholder code="VAS" name="Video Auto Summary" desc="학습 효율의 극대화" />} />
              <Route path="/ccb" element={<ServicePlaceholder code="CCB" name="Customer Care Bot" desc="글로벌 고객 소통 혁신" />} />
              <Route path="/ccs" element={<ServicePlaceholder code="CCS" name="Claude Code Skill" desc="개발 생산성의 도약" />} />
              <Route path="/cdn" element={<ServicePlaceholder code="CDN" name="Content Delivery Network" desc="끊김 없는 미디어 경험" />} />
              <Route path="/cms" element={<ServicePlaceholder code="CMS" name="Construction Management System" desc="현장 관리의 스마트화" />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
