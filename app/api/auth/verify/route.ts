import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ valid: false }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];

        // Simplified validation - in production, check against DB or verify JWT
        const isValid = token.startsWith('mock-admin-token-');

        return NextResponse.json({
            valid: isValid,
            success: isValid
        });
    } catch (error) {
        return NextResponse.json(
            { valid: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
