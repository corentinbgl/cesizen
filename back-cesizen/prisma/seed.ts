import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(){
    const stressEvents = [
        { label: 'Mort du conjoint', points: 100 },
  { label: 'Divorce', points: 73 },
  { label: 'Séparation des époux', points: 65 },
  { label: 'Mort d’un parent proche', points: 63 },
  { label: 'Période de prison', points: 63 },
  { label: 'Blessure corporelle ou maladie', points: 53 },
  { label: 'Mariage', points: 50 },
  { label: 'Licenciement', points: 47 },
  { label: 'Réconciliation entre époux', points: 45 },
  { label: 'Départ à la retraite', points: 45 },
  { label: 'Changement dans la santé d’un membre de la famille', points: 44 },
  { label: 'Grossesse', points: 40 },
  { label: 'Difficultés sexuelles', points: 39 },
  { label: 'Arrivée d’un nouveau membre dans la famille', points: 39 },
  { label: 'Changement dans l’univers du travail', points: 39 },
  { label: 'Changement au niveau financier', points: 38 },
  { label: 'Mort d’un ami proche', points: 37 },
  { label: 'Changement de fonction professionnelle', points: 36 },
  { label: 'Modification de la fréquence des scènes de ménage', points: 35 },
  { label: 'Hypothèque ou emprunt de plus de 3.000 €', points: 31 },
  { label: 'Saisie sur hypothèque ou sur prêt', points: 30 },
  { label: 'Changement de responsabilité dans le travail', points: 29 },
  { label: 'Départ du foyer d’une fille ou d’un fils', points: 29 },
  { label: 'Difficultés avec les beaux-parents', points: 29 },
  { label: 'Succès exceptionnel', points: 28 },
  { label: 'Conjoint commençant ou cessant de travailler', points: 26 },
  { label: 'Début ou fin des études', points: 26 },
  { label: 'Changement dans les conditions de vie', points: 25 },
  { label: 'Changement d’habitudes', points: 24 },
  { label: 'Difficultés avec son employeur/son manager', points: 23 },
  { label: 'Changement d’horaires ou de conditions de travail', points: 20 },
  { label: 'Changement de domicile', points: 20 },
  { label: 'Changement de lieu d’étude', points: 20 },
  { label: 'Changement dans les loisirs', points: 19 },
  { label: 'Changement dans les activités de la paroisse', points: 19 },
  { label: 'Changement dans les activités sociales', points: 19 },
  { label: 'Hypothèque ou emprunt de moins de 3.000€', points: 17 },
  { label: 'Changement dans les habitudes de sommeil', points: 16 },
  { label: 'Changement du nombre de réunions de famille', points: 15 },
  { label: 'Changement dans les habitudes alimentaires', points: 15 },
  { label: 'Vacances', points: 13 },
  { label: 'Noël', points: 12 },
  { label: 'Infractions mineures à la loi, contraventions', points: 11 }
    ]

    await prisma.stressEvent.createMany({ data: stressEvents })

}
main().finally(() => prisma.$disconnect())