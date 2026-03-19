import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { postQuestionaire } from '../api/onboarding';

type OnboardingData = Record<string, number | number[] | string>;

interface OnboardingState {
    data: OnboardingData;
    currentStep: number;
    isLoading: boolean;
    error: string | null;

    updateField: (key: string, value: any) => void;
    setCurrentStep: (step: number) => void;
    submitProfile: () => Promise<void>;
    clearForm: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set, get) => ({
            data: {
                weight: 70,
                sleep: 7,
                restrictions: [0], // Default to 'None'
            },
            currentStep: 0,
            isLoading: false,
            error: null,

            updateField: (key, value) =>
                set((state) => ({
                    data: { ...state.data, [key]: value }
                })),

            setCurrentStep: (step) => set({ currentStep: step }),

            submitProfile: async () => {
                set({ isLoading: true, error: null });
                try {
                    const { data } = get();
                    console.log("data", data);
                    const response = await postQuestionaire(data);
                    console.log("response", response);
                    if (response.status === 200) {
                        set({ isLoading: false, error: null });
                    } else {
                        set({ isLoading: false, error: response.data.detail });
                    }
                } catch (error: any) {
                    set({
                        isLoading: false,
                        error: error.response?.data?.detail || 'Failed to save profile'
                    });
                    throw error;
                }
            },

            clearForm: () =>
                set({
                    data: { weight: 70, sleep: 7, restrictions: [0] },
                    currentStep: 0,
                    error: null
                }),
        }),
        {
            name: 'nutricore-onboarding-draft',
        }
    )
);