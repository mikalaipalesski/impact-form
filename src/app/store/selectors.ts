import { createSelector } from '@ngrx/store';
import { mainStoreFeature } from './reducer';

export const { name: mainStoreFeatureKey, selectMainState } = mainStoreFeature;

export const selectMainMembers = createSelector(selectMainState, (s) => s.members);

export const selectMainMembersLoading = createSelector(selectMainState, (s) => s.membersLoading);  
export const selectMainMembersLoadingError = createSelector(selectMainState, (s) => s.membersLoadingError);

export const selectCurrentSelectedMember = createSelector(selectMainState, (s) => s.currentSelectedMember);

export const selectCurrentSelectedMemberName = createSelector(
    selectCurrentSelectedMember,
    (member) => member?.name || null,
);

export const selectMembersList = createSelector(
    selectCurrentSelectedMember,
    selectMainMembers,
    (selectedMember, members) => selectedMember ?
        members.filter((m) => m.name !== selectedMember!.name) :
        members,
)