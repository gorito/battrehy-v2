const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processImages() {
    const dir = path.join(__dirname, 'public/images/blogg');
    
    // Process the 4 new blog images
    const images = [
        'estetisk-klinik-hero.jpg',
        'estetisk-klinik-behandlingsrum.jpg',
        'estetisk-klinik-hygien.jpg',
        'estetisk-klinik-konsultation.jpg'
    ];

    for (const file of images) {
        const inputPath = path.join(dir, file);
        if (fs.existsSync(inputPath)) {
            const outputPath = path.join(dir, file.replace('.jpg', '.webp'));
            await sharp(inputPath)
                .resize({ width: 1600, withoutEnlargement: true })
                .webp({ quality: 80, effort: 6 })
                .toFile(outputPath);
            console.log(`Converted ${file} to WebP`);
            fs.unlinkSync(inputPath); // Delete old jpg
        }
    }

    // Process the OG share image
    const ogImage = 'estetisk_klinik_exterior.jpeg';
    const ogInput = path.join(dir, ogImage);
    if (fs.existsSync(ogInput)) {
        const ogOutput = path.join(dir, 'estetisk_klinik_exterior-optimized.jpeg');
        await sharp(ogInput)
            .resize(1200, 630, { fit: 'cover' })
            .jpeg({ quality: 80, progressive: true })
            .toFile(ogOutput);
        console.log(`Optimized OG image ${ogImage}`);
        fs.unlinkSync(ogInput);
        fs.renameSync(ogOutput, ogInput); // replace the old one so we don't have to update all references if we don't want to, BUT wait, I will just keep the original name to make it easy.
    }
}

processImages().catch(console.error);
