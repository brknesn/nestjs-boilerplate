import { IsMinMaxLengthOptions } from "@common/@types";
import { applyDecorators } from "@nestjs/common";
import { MaxLength, MinLength } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

/**
 * It's a decorator that validates the length of a string to be between a minimum and maximum length
 * @param {IsMinMaxLengthOptions} [ops] - IsMinMaxLengthOptions
 * returns
 */
export const MinMaxLength = (ops?: IsMinMaxLengthOptions) => {
	const options: IsMinMaxLengthOptions = { minLength: 2, maxLength: 500, each: false, ...ops };

	return applyDecorators(
		MinLength(options.minLength, {
			message: i18nValidationMessage("validation.minLength"),
			each: options.each,
		}),
		MaxLength(options.maxLength, {
			message: i18nValidationMessage("validation.maxLength"),
			each: options.each,
		}),
	);
};
