import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Simple auth for now - can be expanded to use Firebase Auth
        if (password === 'parrot') {
            return NextResponse.json({
                success: true,
                token: 'mock-admin-token-' + Date.now(),
                message: 'Login successful'
            });
        }

        return NextResponse.json(
            { success: false, message: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
