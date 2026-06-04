import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ImpactMember } from '../model/member-model';

export const mainStoreActions = createActionGroup({
    source: 'Main Store',
    events: {
        Entered: emptyProps(),
        LoadMembers: emptyProps(),
        LoadMembersSuccess: props<{ members: ImpactMember[] }>(),
        LoadMembersFailed: props<{ error: any }>(),
        SelectCurrentMember: props<{ member: ImpactMember }>(),
        NavigateToMain: emptyProps(),
    },
});
