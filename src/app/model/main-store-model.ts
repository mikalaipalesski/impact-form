import { ImpactMember } from './member-model';

export interface MainStoreState {
    members: ImpactMember[];
    membersLoading: boolean;
    membersLoadingError: any;
    currentSelectedMember: ImpactMember | null;
}

