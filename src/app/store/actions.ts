import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ImpactMember } from '../model/member-model';

export const mainStoreActions = createActionGroup({
    source: 'Main Store',
    events: {
        LoadMembers: emptyProps(),
        LoadMembersSuccess: props<{ members: ImpactMember[] }>(),
        LoadMembersFailed: props<{ error: ImpactMember }>(),
        SelectCurrentMember: props<{ member: ImpactMember }>(),
    },
});
