/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ClinicalSafetyBanner } from './components/common/ClinicalSafetyBanner';
import { CareDashboard } from './components/care/CareDashboard';
import { InitialAssessment } from './components/care/InitialAssessment';
import { BodyMap } from './components/care/BodyMap';
import { DocumentManager } from './components/care/DocumentManager';
import { AiAssistant } from './components/care/AiAssistant';
import { EducationalLibrary } from './components/care/EducationalLibrary';
import { MuscleLibrary } from './components/care/MuscleLibrary';
import { RoutineCalendar } from './components/care/RoutineCalendar';
import { PatientProfile } from './components/care/PatientProfile';
import { ProDashboard } from './components/pro/ProDashboard';
import { PatientList } from './components/pro/PatientList';
import { PatientChart } from './components/pro/PatientChart';
import { AiReviewQueue } from './components/pro/AiReviewQueue';
import { ClinicalChat } from './components/pro/ClinicalChat';
import { ClinicManagement } from './components/pro/ClinicManagement';
import { ScientificExplorer } from './components/science/ScientificExplorer';
import { PlatformAdminPanel } from './components/admin/PlatformAdminPanel';
import { PlansPricingModal } from './components/plans/PlansPricingModal';
import { AuthModal } from './components/auth/AuthModal';
import { SecuritySuiteModal } from './components/common/SecuritySuiteModal';

const MainApp: React.FC = () => {
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isPlansOpen, setIsPlansOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // When switching role, reset tab to dashboard & clear selected patient chart
  useEffect(() => {
    setActiveTab('dashboard');
    setSelectedPatientId(null);
  }, [role]);

  const handleNavigatePro = (tabId: string, param?: string) => {
    if (tabId === 'patients' && param) {
      setSelectedPatientId(param);
    } else {
      setSelectedPatientId(null);
    }
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] dark:bg-[#0B1720] text-[#172B3A] dark:text-[#DCE9EB] flex flex-col font-['Inter'] transition-colors">
      
      {/* 1. Global Clinical Safety Banner */}
      <ClinicalSafetyBanner />

      {/* 2. Header */}
      <Header
        onOpenPlans={() => setIsPlansOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSecurity={() => setIsSecurityOpen(true)}
        onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* 3. Main Workspace Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setSelectedPatientId(null);
            setActiveTab(tab);
          }}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onOpenSecurity={() => setIsSecurityOpen(true)}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          
          {/* ===================== CARE (PATIENT) VIEWS ===================== */}
          {role === 'patient' && (
            <>
              {activeTab === 'dashboard' && <CareDashboard onNavigate={setActiveTab} />}
              {activeTab === 'assessment' && <InitialAssessment />}
              {activeTab === 'bodymap' && <BodyMap />}
              {activeTab === 'documents' && <DocumentManager />}
              {activeTab === 'assistant' && <AiAssistant onNavigateToRoutine={() => setActiveTab('routine')} />}
              {activeTab === 'muscles' && <MuscleLibrary onNavigateToRoutine={() => setActiveTab('routine')} />}
              {activeTab === 'library' && <EducationalLibrary />}
              {activeTab === 'routine' && <RoutineCalendar />}
              {activeTab === 'evolution' && <RoutineCalendar />}
              {activeTab === 'profile' && <PatientProfile />}
            </>
          )}

          {/* ===================== PRO (PHYSIOTHERAPIST / CLINIC) VIEWS ===================== */}
          {(role === 'physiotherapist' || role === 'clinic_admin') && (
            <>
              {activeTab === 'dashboard' && <ProDashboard onNavigate={handleNavigatePro} />}
              {activeTab === 'patients' && (
                selectedPatientId ? (
                  <PatientChart 
                    patientId={selectedPatientId} 
                    onBack={() => setSelectedPatientId(null)} 
                  />
                ) : (
                  <PatientList 
                    onSelectPatient={(pId) => setSelectedPatientId(pId)} 
                  />
                )
              )}
              {activeTab === 'invitations' && (
                <PatientList onSelectPatient={(pId) => setSelectedPatientId(pId)} />
              )}
              {activeTab === 'reviews' && <AiReviewQueue />}
              {activeTab === 'chat' && <ClinicalChat />}
              {activeTab === 'science' && <ScientificExplorer />}
              {activeTab === 'clinic' && <ClinicManagement />}
              {activeTab === 'settings' && <PatientProfile />}
            </>
          )}

          {/* ===================== PLATFORM ADMIN VIEWS ===================== */}
          {role === 'platform_admin' && (
            <>
              {activeTab === 'dashboard' && <PlatformAdminPanel />}
              {activeTab === 'crefito_validation' && <PlatformAdminPanel />}
              {activeTab === 'science_management' && <ScientificExplorer />}
              {activeTab === 'audit_logs' && <PlatformAdminPanel />}
            </>
          )}

        </main>
      </div>

      {/* 4. Global Modals */}
      <PlansPricingModal
        isOpen={isPlansOpen}
        onClose={() => setIsPlansOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <SecuritySuiteModal
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
