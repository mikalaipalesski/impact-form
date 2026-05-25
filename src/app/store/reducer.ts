import { createReducer, on, createFeature } from '@ngrx/store';
import { MainStoreState } from '../model/main-store-model';
import { mainStoreActions } from './actions';

export const MAIN_STORE_KEY = 'main';

export const INITIAL_MAIN_STORE: MainStoreState = {
    members: [],
    membersLoading: false,
    membersLoadingError: null,
    currentSelectedMember: null,
}

export const mainStoreReducer = createReducer(
    INITIAL_MAIN_STORE,
    on(mainStoreActions.loadMembers, (state) => ({
        ...state,
        membersLoading: true,
        membersLoadingError: null,
    })),
    on(mainStoreActions.loadMembersSuccess, (state, { members }) => ({
        ...state,
        members,
        membersLoading: false,
        membersLoadingError: null,
    })),
    on(mainStoreActions.loadMembersFailed, (state, { error }) => ({
        ...state,
        membersLoading: false,
        membersLoadingError: error,
    })),
    on(mainStoreActions.selectCurrentMember, (state, { member }) => ({
        ...state,
        currentSelectedMember: member,
    })),    
);

export const mainStoreFeature = createFeature({
    name: MAIN_STORE_KEY,
    reducer: mainStoreReducer,
});
