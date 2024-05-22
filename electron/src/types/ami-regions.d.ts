export type AmiRegions = 'af-south-1'
| 'ap-east-1'
| 'ap-northeast-1'
| 'ap-south-1'
| 'ap-southeast-2'
| 'ca-central-1'
| 'eu-central-1'
| 'eu-north-1'
| 'eu-west-2'
| 'us-east-1'
| 'us-west-1'

export type AmiRegionLabels = 'AF South (Cape Town)'
| 'AP East (Hong Kong)'
| 'AP Northeast (Tokyo)'
| 'AP South (Mumbai)'
| 'AP Southeast (Sydney)'
| 'CA Central (Canada)'
| 'EU Central (Frankfurt)'
| 'EU North (Stockholm)'
| 'EU West (London)'
| 'US East (N. Virginia)'
| 'US West (N. California)'

export type AmiRegionLocation = {
    ami?: AmiServerRegions
    label: AmiRegionLabels
    region: AmiRegions
    securityGroups?: string[]
    subnetId?: string
}

export enum AmiServerRegions {
  capeTown = 'af-south-1',
  hongKong = 'ap-east-1',
  tokyo = 'ap-northeast-1',
  mumbai = 'ap-south-1',
  sydney = 'ap-southeast-2',
  canada = 'ca-central-1',
  frankfurt = 'eu-central-1',
  stockholm = 'eu-north-1',
  london = 'eu-west-2',
  nVirginia = 'us-east-1',
  nCalifornia = 'us-west-1',
}
