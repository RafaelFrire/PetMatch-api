import bcrypt from 'bcrypt'

export async function encode(password: string): Promise<string | null> {
    try {
        const hash = await bcrypt.hash(password, 10); 
        return hash;
    } catch (err) {
        console.error(err); // Loga o erro
        return null; 
    }
}

export async function decrypt(password: string, hash: string): Promise<boolean> {
    try {
        const result = await bcrypt.compare(password, hash);
        return result;
    } catch (err) {
        console.error(err);
        return false; // Retorna false em caso de erro
    }
}