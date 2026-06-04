import { createSelector } from '@ngrx/store';
import { mainStoreFeature } from './reducer';
import { ENLISTED_MEMBER_RANKS } from '../constants/enlisted-member-ranks';
import { MemberRank } from '../model/member-model';

export const { name: mainStoreFeatureKey, selectMainState } = mainStoreFeature;

export const selectMainMembers = createSelector(selectMainState, (s) => s.members);

export const selectMainMembersLoading = createSelector(selectMainState, (s) => s.membersLoading);
export const selectMainMembersLoadingError = createSelector(
  selectMainState,
  (s) => s.membersLoadingError,
);

export const selectCurrentSelectedMember = createSelector(
  selectMainState,
  (s) => s.currentSelectedMember,
);

export const selectCurrentSelectedMemberName = createSelector(
  selectCurrentSelectedMember,
  (member) => member?.name || null,
);

export const selectMembersList = createSelector(
  selectCurrentSelectedMember,
  selectMainMembers,
  (selectedMember, members) =>
    selectedMember ? members.filter((m) => m.name !== selectedMember!.name) : members,
);

export const selectEnlistedMembers = createSelector(selectMainMembers, (members) =>
  members.filter((member) => ENLISTED_MEMBER_RANKS.includes(member.rank as MemberRank)),
);
