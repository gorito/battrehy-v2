import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const rawData = `Akademikliniken	Storängsv. 10	115 41	Stockholm	Maja Westerblom	08-615 54 00
Alex Cosmetic	Nygatan 33	931 32	Skellefteå	Jörgen Lindmark	072-556 56 00
Babor Sverige AB	Sveavägen 77	113 50	Stockholm	Malin Bardell	08-12 13 71 00
Beauty Academy By Dashl	Riddargatan 35	114 57	Stockholm	Lava Kerber	08-723 17 00
Beauty House	Industrig. 42	312 34	Laholm	Lone Bjerregaard	0430-716 00
Beauty International Wellness AB	Stubbsundsv. 17	131 41	Nacka	Nathalie Perron	08-718 31 10
Beauty International Smart Buy AB	Bredablicksv. 6	181 42	Lidingö	Jenny Bove	08-718 31 10
Beauty Technology Sweden AB	Cylindervägen 18, Box 1113	131 26	Nacka	Mikaela Tersaeus Wistmar	072-717 64 67
Beauty Service Sweden AB	Hufvudsta gård, Sjölängan	171 73	Solna	Jenny Eyre	08-684 50 500
Cosmedica Nordic AB	Tomtebogatan 4	113 39	Stockholm	Kornelia Eickhoff	070-551 52 75
Dashl Beauty Academy AB	Riddargatan 35	114 57	Stockholm	Lava Kerber	08-723 17 00
Derma ProMedical	Hantverkargatan 9	334 33	Anderstorp	Elizabeth Moberg	0371-184 66
Dermarome AB	Rosenlundsg. 50, 4 tr	118 63	Stockholm	Erika Bennerholt	08-14 18 11
Ellancé Pro Beauty	Kommendörsg. 44	114 58	Stockholm	Jenny Ahlfort	08-545 688 50
Ellies Hudvårdssalong AB	Rådmansgatan 84	113 29	Stockholm	Elisaveta D. Jakobsson	070-481 02 95
Exuviance	Vårgatan 1	212 18	Malmö	Gunilla Tapper Andersson	040-30 31 32
Fonnix	Hyreg. 1	211 21	Malmö	Ilona Bengtsson	040-12 08 68
Gilda Beauty Wholesale AB	Mölndalsv. 38	412 63	Göteborg	Shabana Sharifi	031-16 87 87
Go North Medical Derma AB	Flöjelbergsgatan 3	431 35	Mölndal	Jonas Angervall	070-9251961
Hudologi/Dr.Belter	Radiovägen 28	135 48	Tyresö	Elina Anttila	070-746 46 21	 
Hudoteket AB/Dr Schrammek Sverige 	Östra Storgatan 6	553 21	Jönköping	Pernilla Jonsson	0760-072245
KFI Spa Management AB	Artillerig. 42, 2 tr	114 45	Stockholm	Maria Grunditz	08-534 88 500
Kraft Cosmetics	Kalendeg. 25	211 35	Malmö	Johan Kraft	040-23 20 90
Luxoro AB	Stureg. 32 	114 36	Stockholm	 	08-522 457 20
Lycon Nordic Ltd.	Underhaugsveien 3 C	0354	Oslo	Janet Beitnes	+47 928 53 057
Maria Åkerberg AB	Rya Industriv. 33	439 62	Frillesås	Maria Åkerberg	0340-27 00 00
Marja Entrich AB	Box 5393	102 49	Stockholm	 	08-663 82 44
Mette Cosmetique AB	Florettg. 31	254 67	Helsingborg	Ingemar Berg	042-16 00 17
Mette Picaut AB	Furubergsvägen 3	429 41	Särö	Mette Picaut	070-974 18 73
MM Skincare AB	Bryggavägen 133	178 51	Ekerö	Lene Meldgaard	073-384 68 47
Nordic Natural Beauty Distribution AB	Apelvretsvägen 36	136 72	Vendelsö	Lillemor Svensson	073-620 06 48
Noscomed	Svanemøllevej 11	2100	København Ø	Michael Klarskov	+45 36 30 64 44
Palina AB	Stålg. 4	703 83	Örebro	Lina Ivarsson	019-17 93 30
Powerlite AB	Flöjelbergsg. 8 A	431 37	Mölndal	Zandra Bergqvist	031-706 65 50
Qvi Si - Haute couture de la beauté	Vallhallavägen 110	114 41	Stockholm	Therese Ekehjelm	08-661 17 99
Rejuv Beauty Sverige AB	Hälsingegatan 10	113 23	Stockholm	Maili Lindmäe	076-256 67 32
RS Biokosmetik AB	Hagadalsg. 6	615 32	Valdemarsvik	Carina Swartz	0123-104 51
Scandinavian Cosmetics AB	Box 9078	200 39	Malmö	Suzanne Jaeger	040-311 500
SkinCare by Us	Riddarg. 3 B	114 35	Stockholm	Therese Mathisen	070-996 23 30
Skin Concept AB	Ranhammarsv. 20 F	168 67	Bromma	 	08-545 787 40
Technovital AB	Gyllenstiernsg. 16	115 26	Stockholm	Lars Kadmark	08-765 68 60
Work & Clothes	Järnvägsgatan 15	274 34 	Skurup	Jaka Sjöö	040-23 75 70`;

async function bulkUpdate() {
    console.log('Fetching clinics from database...');
    const { data: dbClinics, error: fetchError } = await supabase
        .from('clinics')
        .select('id, name, city');

    if (fetchError || !dbClinics) {
        console.error('Error fetching clinics:', fetchError);
        return;
    }

    console.log(`Found ${dbClinics.length} clinics in database.`);

    const shrMembers = rawData.split('\n').map(line => {
        const parts = line.split('\t').map(p => p.trim());
        return {
            name: parts[0],
            city: parts[3]
        };
    });

    console.log(`Processing ${shrMembers.length} SHR members from list.`);

    let matchCount = 0;
    const updates = [];

    const coreKeywords = [
        'Akademikliniken', 'Dashl', 'Qvi Si', 'Ellies', 'Gilda', 'Maria Åkerberg', 
        'Babor', 'Exuviance', 'Beauty House', 'Beauty International', 'Cosmedica', 
        'Derma ProMedical', 'Dermarome', 'Ellancé', 'Mette Cosmetique', 'MM Skincare', 
        'Palina', 'Powerlite', 'Rejuv Beauty'
    ];

    for (const member of shrMembers) {
        let memberMatches: any[] = [];

        // 1. Exact name + city match
        const exactMatches = dbClinics.filter(c => 
            c.name.toLowerCase() === member.name.toLowerCase() && 
            c.city.toLowerCase() === member.city?.toLowerCase()
        );
        memberMatches.push(...exactMatches);

        // 2. Partial name match within same city
        const partialCityMatches = dbClinics.filter(c => 
            (c.name.toLowerCase().includes(member.name.toLowerCase()) || member.name.toLowerCase().includes(c.name.toLowerCase())) &&
            c.city.toLowerCase() === member.city?.toLowerCase()
        );
        memberMatches.push(...partialCityMatches);

        // 3. Core keyword match across ALL cities for specific big brands
        const keyword = coreKeywords.find(k => member.name.toLowerCase().includes(k.toLowerCase()));
        if (keyword) {
            const keywordMatches = dbClinics.filter(c => c.name.toLowerCase().includes(keyword.toLowerCase()));
            memberMatches.push(...keywordMatches);
        }

        // Deduplicate and process matches
        const uniqueMemberMatches = Array.from(new Set(memberMatches.map(m => m.id)))
            .map(id => memberMatches.find(m => m.id === id));

        if (uniqueMemberMatches.length > 0) {
            uniqueMemberMatches.forEach(match => {
                if (!updates.includes(match.id)) {
                    console.log(`Matched: "${member.name}" -> "${match.name}" (${match.city})`);
                    matchCount++;
                    updates.push(match.id);
                }
            });
        }
    }

    console.log(`Matched ${matchCount} out of ${shrMembers.length} SHR members.`);

    if (updates.length > 0) {
        console.log(`Updating ${updates.length} clinics to is_shr_member = true...`);
        const { error: updateError } = await supabase
            .from('clinics')
            .update({ is_shr_member: true })
            .in('id', updates);

        if (updateError) {
            console.error('Error updating clinics:', updateError);
        } else {
            console.log('Successfully updated clinics!');
        }
    } else {
        console.log('No clinics to update.');
    }
}

bulkUpdate();
