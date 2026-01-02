/**
 * Phone number validation utilities for African mobile operators
 * Supports MTN, Orange, and other operators across Africa
 */

export type MobileOperator = 'mtn' | 'orange' | 'other' | 'unknown'

interface ValidationResult {
    isValid: boolean
    operator: MobileOperator
    formattedNumber: string
    suggestion?: string
    warning?: string
}

const CAMEROON_PREFIXES = {
    mtn: ['67', '650', '651', '652', '653', '654', '680', '681', '682', '683'],
    orange: ['69', '655', '656', '657', '658', '659'],
    other: ['62', '642', '643']
}

export function cleanPhoneNumber(phone: string): string {
    return phone.replace(/[^\d+]/g, '')
}

export function detectOperator(phone: string): MobileOperator {
    const cleaned = cleanPhoneNumber(phone)
    const number = cleaned.startsWith('+237') ? cleaned.slice(4) : cleaned
    const number237 = cleaned.startsWith('237') ? number.slice(3) : number

    for (const prefix of CAMEROON_PREFIXES.mtn) {
        if (number237.startsWith(prefix)) return 'mtn'
    }
    for (const prefix of CAMEROON_PREFIXES.orange) {
        if (number237.startsWith(prefix)) return 'orange'
    }
    for (const prefix of CAMEROON_PREFIXES.other) {
        if (number237.startsWith(prefix)) return 'other'
    }

    const digitsOnly = number237.replace(/\D/g, '')
    if (digitsOnly.length >= 8 && digitsOnly.length <= 10) return 'other'

    return 'unknown'
}

export function formatPhoneNumber(phone: string): string {
    const cleaned = cleanPhoneNumber(phone)
    let countryCode = ''
    let number = cleaned

    if (cleaned.startsWith('+')) {
        const match = cleaned.match(/^\+(\d{1,3})(.*)/)
        if (match) {
            countryCode = match[1]
            number = match[2].replace(/\D/g, '')
        }
    } else if (cleaned.match(/^\d{3}/)) {
        const possibleCode = cleaned.slice(0, 3)
        if (['237', '234', '254', '255', '256'].includes(possibleCode)) {
            countryCode = possibleCode
            number = cleaned.slice(3).replace(/\D/g, '')
        } else {
            number = cleaned.replace(/\D/g, '')
        }
    } else {
        number = cleaned.replace(/\D/g, '')
    }

    if (!countryCode && number.length > 0) countryCode = '237'

    if (number.length >= 9) {
        return `+${countryCode} ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 9)}`
    } else if (number.length >= 6) {
        return `+${countryCode} ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`
    } else if (number.length >= 3) {
        return `+${countryCode} ${number.slice(0, 3)} ${number.slice(3)}`
    } else if (number.length > 0) {
        return `+${countryCode} ${number}`
    }
    return `+${countryCode} `
}

export function validatePhoneNumber(phone: string): ValidationResult {
    const cleaned = cleanPhoneNumber(phone);
    let number = cleaned;

    // Remove country code only if explicitly present
    if (cleaned.startsWith('+')) {
        // Remove + and the following 1-3 digits (country code)
        number = cleaned.substring(1).replace(/^\d{1,3}/, '');
    } else if (cleaned.length >= 11 && (cleaned.startsWith('237') || cleaned.startsWith('234'))) {
        // Remove known country code prefix if it's potentially safe (length >= 11)
        number = cleaned.substring(3);
    }

    number = number.replace(/\D/g, '');

    if (number.length < 8) {
        return {
            isValid: false,
            operator: 'unknown',
            formattedNumber: formatPhoneNumber(phone),
            warning: 'Le numéro semble incomplet'
        }
    }
    if (number.length > 10) {
        return {
            isValid: false,
            operator: 'unknown',
            formattedNumber: formatPhoneNumber(phone),
            warning: 'Le numéro semble trop long'
        }
    }

    const detectedOperator = detectOperator(phone)
    if (detectedOperator === 'other') {
        return {
            isValid: false,
            operator: 'other',
            formattedNumber: formatPhoneNumber(phone),
            warning: 'Seuls MTN et Orange sont acceptés'
        }
    }
    if (detectedOperator === 'unknown') {
        return {
            isValid: false,
            operator: 'unknown',
            formattedNumber: formatPhoneNumber(phone),
            warning: 'Numéro non reconnu'
        }
    }

    return {
        isValid: true,
        operator: detectedOperator,
        formattedNumber: formatPhoneNumber(phone),
    }
}
