import agriconnect1 from './projects/agriconnect-1.jpg';
import agriconnect2 from './projects/agriconnect-2.jpg';
import agriconnect3 from './projects/agriconnect-3.jpg';
import gaia1 from './projects/gaia-1.jpg';
import gaia2 from './projects/gaia-2.jpg';
import gaia3 from './projects/gaia-3.jpg';
import terra1 from './projects/terra-1.jpg';
import terra2 from './projects/terra-2.jpg';
import terra3 from './projects/terra-3.jpg';
import atlas1 from './projects/atlas-1.jpg';
import atlas2 from './projects/atlas-2.jpg';
import atlas3 from './projects/atlas-3.jpg';
import sentinel1 from './projects/sentinel-1.jpg';
import sentinel2 from './projects/sentinel-2.jpg';
import sentinel3 from './projects/sentinel-3.jpg';
import kanopi1 from './projects/kanopi-1.jpg';
import kanopi2 from './projects/kanopi-2.jpg';
import kanopi3 from './projects/kanopi-3.jpg';
import imbuto1 from './projects/imbuto-1.jpg';
import imbuto2 from './projects/imbuto-2.jpg';
import imbuto3 from './projects/imbuto-3.jpg';

export const projectImages: Record<string, [string, string, string]> = {
  GAIA: [gaia1, gaia2, gaia3],
  'AgriConnect-RW': [agriconnect1, agriconnect2, agriconnect3],
  TERRA: [terra1, terra2, terra3],
  ATLAS: [atlas1, atlas2, atlas3],
  SENTINEL: [sentinel1, sentinel2, sentinel3],
  KANOPI: [kanopi1, kanopi2, kanopi3],
  Imbuto: [imbuto1, imbuto2, imbuto3],
};
