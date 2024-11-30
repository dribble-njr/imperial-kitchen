import { SetMetadata } from '@nestjs/common';

export const NO_TRANSFORM_RESPONSE_KEY = 'no-transform';
export const NoTransformResponse = () => SetMetadata(NO_TRANSFORM_RESPONSE_KEY, true);
