import Cloudant from 'cloudant'
import { CLOUDANT_URL } from '../env'
export default Cloudant({ url: CLOUDANT_URL, plugin: 'promises' })
