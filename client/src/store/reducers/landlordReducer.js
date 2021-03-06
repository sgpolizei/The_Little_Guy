/** LANDLORD PROPERTIES reducer functions */

import _ from 'lodash';

import {
    FETCH_MY_PROPERTIES,
    ADD_MY_PROPERTY,
    EDIT_MY_PROPERTY,
    DELETE_MY_PROPERTY
} from '../actions';

const propertyReducer = (state = {}, action) => {
    switch(action.type) {
        case FETCH_MY_PROPERTIES: 
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case ADD_MY_PROPERTY:
            return { ...state, [action.payload._id]: action.payload }
        case EDIT_MY_PROPERTY:
            let currentValues = state[action.payload._id];
            let updatedValues = { ...currentValues, ...action.payload };

            return { ...state, [action.payload._id]: updatedValues }
        case DELETE_MY_PROPERTY:
            return _.omit(state, action.payload._id);
        default: 
            return state;
    }
};

export default propertyReducer;