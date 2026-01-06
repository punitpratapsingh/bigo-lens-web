import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Share2,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  ShoppingCart,
  Users,
  DollarSign,
  Clock,
  Target,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Package,
  Truck,
  CreditCard,
  MessageSquare,
  Star,
  Eye,
  ShoppingBag,
  Tag,
  Percent,
  Award,
  ChevronRight,
  ChevronDown,
  Maximize2,
  Minimize2,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Database,
  Cpu,
  Cloud,
  Lock,
  Unlock,
  Activity,
  Layers,
  GitBranch,
  Code,
  Terminal,
  BarChart2,
  Bell,
  Mail,
  Calendar,
  UserCheck,
  Clipboard,
  FileText,
  FileCheck,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  Copy,
  Edit,
  Trash2,
  Plus,
  Minus,
  MoreVertical,
  Upload,
  DownloadCloud,
  Printer,
  Image,
  Video,
  Folder,
  HardDrive,
  Server,
  Key,
  Fingerprint,
  ShieldCheck,
  ShieldAlert,
  Bug,
  TestTube,
  Beaker,
  Microscope,
  Radio,
  Camera,
  Mic,
  Headphones,
  Volume2,
  BellRing,
  Moon,
  Sun,
  Palette,
  Sparkles,
  Rocket,
  Flag,
  Trophy,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Coffee,
  Gamepad2,
  Tv,
  Film,
  Book,
  Newspaper,
  PenTool,
  Compass,
  Navigation,
  Car,
  Bike,
  Home,
  Building,
  Factory,
  Warehouse,
  Store,
  Wallet,
  Banknote,
  Coins,
  Bitcoin,
  ScatterChart,
  Radar,
  Map,
  CloudRain,
  Wind,
  Sunset,
  Sunrise,
  CalendarDays,
  Timer,
  VolumeX,
  Bluetooth,
  Signal,
  BatteryCharging,
  Power,
  Anchor,
  Mountain,
  Flower,
  Leaf,
  Bug as BugIcon,
  Cat,
  Dog,
  Fish,
  Skull,
  Cross,
  Moon as MoonIcon,
  Snowflake,
  Umbrella,
  Sword,
  Castle,
  Gem,
  Diamond,
  Key as KeyIcon,
  EyeOff,
  ZoomIn,
  ZoomOut,
  Grid,
  List,
  Layout,
  Sidebar,
  Menu,
  X,
  ChevronLeft,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  MoveUp,
  MoveDown,
  MoveLeft,
  MoveRight,
  FolderPlus,
  FolderMinus,
  FilePlus,
  FileMinus,
  BookOpen,
  BookMarked,
  Notebook,
  AlarmClock,
  Hourglass,
  Lamp,
  Lightbulb,
  DoorOpen,
  DoorClosed,
  Bed,
  Sofa,
  Bath,
  TreePine,
  Flower2,
  Apple,
  Egg,
  Milk,
  Coffee as CoffeeIcon,
  Wine,
  Pizza,
  Fish as FishIcon,
  Satellite,
  Telescope,
  Atom,
  Stethoscope,
  Syringe,
  Pill,
  Brain,
  HeartPulse,
  Microchip,
  CircuitBoard,
  Keyboard,
  Mouse,
  Monitor,
  Phone,
  Laptop,
  Router,
  Antenna,
  Megaphone,
  GraduationCap,
  Briefcase,
  PiggyBank,
  ChartBarIncreasing,
  ChartBarDecreasing,
  ChartCandlestick,
  ChartArea,
  ChartGantt,
  BrainCircuit,
  Webhook,
  GitPullRequest,
  GitCommit,
  GitMerge,
  GitCompare,
  Brackets,
  Parentheses,
  Asterisk,
  Hash,
  Infinity,
  Pi,
  Omega,
  Sigma,
  Copyright,
  PhoneCall,
  PhoneOff,
  MessageCircle,
  MessagesSquare,
  Inbox,
  Send,
  MailOpen,
  Mailbox,
  BellDot,
  AlarmSmoke,
  CalendarHeart,
  ClockAlert,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudMoon,
  CloudSun,
  Cloudy,
  Haze,
  Rainbow,
  Tornado,
  Waves,
  Flame,
  EggFried,
  IceCream,
  Cookie,
  Drumstick,
  Soup,
  Crown,
  Scan,
  QrCode,
  Barcode,
  RadioTower,
  Luggage,
  ChartBarStacked,
  Code2,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUp,
  ChevronsDown,
  Hash as HashIcon,
  PhoneForwarded,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  Voicemail,
  MessageSquareDashed,
  MailWarning,
  MailCheck,
  MailX,
  BellMinus,
  BellPlus,
  AlarmClockCheck,
  AlarmClockMinus,
  AlarmClockPlus,
  CalendarClock,
  CalendarSearch,
  ClockArrowDown,
  ClockArrowUp,
  CloudMoonRain,
  CloudRainWind,
  CloudSunRain,
  Moon as MoonIcon2,
  Snowflake as SnowflakeIcon,
  SunDim,
  Thermometer as ThermometerIcon,
  Droplets,
  Carrot,
  Beer as BeerIcon,
  Candy,
  Lollipop,
  Popcorn,
  Snail,
  Worm,
  SatelliteDish,
  ThermometerSnowflake,
  Bone,
  Ear,
  Hand,
  Footprints,
  Usb,
  Plug,
  Construction,
  Hammer,
  Wrench,
  Paintbrush,
  Pencil,
  Highlighter,
  Eraser,
  StickyNote,
  Paperclip,
  Link,
  Link2,
  LockKeyhole,
  KeySquare,
  Save,
  CheckSquare,
  Check,
  ChevronsRight as ChevronsRightIcon,
  ChevronsDown as ChevronsDownIcon,
  Book as BookIcon,
  Eye as EyeIcon,
  Brain as BrainIcon,
  Cloud as CloudIcon,
  Heart as HeartIcon,
  Users as UsersIcon,
  DollarSign as DollarSignIcon,
  TrendingUp as TrendingUpIcon,
  ChevronRight as ChevronRightIcon,
  Map as MapIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Shield as ShieldIcon,
  Zap as ZapIcon,
  Globe as GlobeIcon,
  Smartphone as SmartphoneIcon,
  Package as PackageIcon,
  Truck as TruckIcon,
  CreditCard as CreditCardIcon,
  MessageSquare as MessageSquareIcon,
  Star as StarIcon,
  ShoppingBag as ShoppingBagIcon,
  Tag as TagIcon,
  Percent as PercentIcon,
  Award as AwardIcon,
  Settings as SettingsIcon,
  Play as PlayIcon,
  Database as DatabaseIcon,
  Cpu as CpuIcon,
  Activity as ActivityIcon,
  Layers as LayersIcon,
  Code as CodeIcon,
  Terminal as TerminalIcon,
  Bell as BellIcon,
  Mail as MailIcon,
  UserCheck as UserCheckIcon,
  Clipboard as ClipboardIcon,
  FileText as FileTextIcon,
  FileCheck as FileCheckIcon,
  AlertTriangle as AlertTriangleIcon,
  HelpCircle as HelpCircleIcon,
  ExternalLink as ExternalLinkIcon,
  Copy as CopyIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  MoreVertical as MoreVerticalIcon,
  Upload as UploadIcon,
  DownloadCloud as DownloadCloudIcon,
  Printer as PrinterIcon,
  Image as ImageIcon,
  Video as VideoIcon,
  Folder as FolderIcon,
  HardDrive as HardDriveIcon,
  Server as ServerIcon,
  Key as KeyIcon2,
  Fingerprint as FingerprintIcon,
  ShieldCheck as ShieldCheckIcon,
  ShieldAlert as ShieldAlertIcon,
  Bug as BugIcon2,
  TestTube as TestTubeIcon,
  Beaker as BeakerIcon,
  Microscope as MicroscopeIcon,
  Radio as RadioIcon,
  Camera as CameraIcon,
  Mic as MicIcon,
  Headphones as HeadphonesIcon,
  Volume2 as Volume2Icon,
  BellRing as BellRingIcon,
  Moon as MoonIcon3,
  Sun as SunIcon,
  Palette as PaletteIcon,
  Sparkles as SparklesIcon,
  Rocket as RocketIcon,
  Flag as FlagIcon,
  Trophy as TrophyIcon,
  Heart as HeartIcon2,
  ThumbsUp as ThumbsUpIcon,
  ThumbsDown as ThumbsDownIcon,
  Coffee as CoffeeIcon2,
  Gamepad2 as Gamepad2Icon,
  Tv as TvIcon,
  Film as FilmIcon,
  Book as BookIcon2,
  Newspaper as NewspaperIcon,
  PenTool as PenToolIcon,
  Compass as CompassIcon,
  Navigation as NavigationIcon,
  Car as CarIcon,
  Bike as BikeIcon,
  Home as HomeIcon,
  Building as BuildingIcon,
  Factory as FactoryIcon,
  Warehouse as WarehouseIcon,
  Store as StoreIcon,
  Wallet as WalletIcon,
  Banknote as BanknoteIcon,
  Coins as CoinsIcon,
  Bitcoin as BitcoinIcon,
  ScatterChart as ScatterChartIcon,
  Radar as RadarIcon,
  Map as MapIcon2,
  CloudRain as CloudRainIcon,
  Wind as WindIcon,
  Sunset as SunsetIcon,
  Sunrise as SunriseIcon,
  CalendarDays as CalendarDaysIcon,
  Timer as TimerIcon,
  VolumeX as VolumeXIcon,
  Bluetooth as BluetoothIcon,
  Signal as SignalIcon,
  BatteryCharging as BatteryChargingIcon,
  Power as PowerIcon,
  Anchor as AnchorIcon,
  Mountain as MountainIcon,
  Flower as FlowerIcon,
  Leaf as LeafIcon,
  Cat as CatIcon,
  Dog as DogIcon,
  Fish as FishIcon2,
  Skull as SkullIcon,
  Cross as CrossIcon,
  Moon as MoonIcon4,
  Snowflake as SnowflakeIcon2,
  Umbrella as UmbrellaIcon,
  Sword as SwordIcon,
  Castle as CastleIcon,
  Gem as GemIcon,
  Diamond as DiamondIcon,
  EyeOff as EyeOffIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Grid as GridIcon,
  List as ListIcon,
  Layout as LayoutIcon,
  Sidebar as SidebarIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronUp as ChevronUpIcon,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  MoveUp as MoveUpIcon,
  MoveDown as MoveDownIcon,
  MoveLeft as MoveLeftIcon,
  MoveRight as MoveRightIcon,
  FolderPlus as FolderPlusIcon,
  FolderMinus as FolderMinusIcon,
  FilePlus as FilePlusIcon,
  FileMinus as FileMinusIcon,
  BookOpen as BookOpenIcon,
  BookMarked as BookMarkedIcon,
  Notebook as NotebookIcon,
  AlarmClock as AlarmClockIcon,
  Hourglass as HourglassIcon,
  Lamp as LampIcon,
  Lightbulb as LightbulbIcon,
  DoorOpen as DoorOpenIcon,
  DoorClosed as DoorClosedIcon,
  Bed as BedIcon,
  Sofa as SofaIcon,
  Bath as BathIcon,
  TreePine as TreePineIcon,
  Flower2 as Flower2Icon,
  Apple as AppleIcon,
  Egg as EggIcon,
  Milk as MilkIcon,
  Wine as WineIcon,
  Pizza as PizzaIcon,
  Satellite as SatelliteIcon,
  Telescope as TelescopeIcon,
  Atom as AtomIcon,
  Stethoscope as StethoscopeIcon,
  Syringe as SyringeIcon,
  Pill as PillIcon,
  Brain as BrainIcon2,
  HeartPulse as HeartPulseIcon,
  Microchip as MicrochipIcon,
  CircuitBoard as CircuitBoardIcon,
  Keyboard as KeyboardIcon,
  Mouse as MouseIcon,
  Monitor as MonitorIcon,
  Phone as PhoneIcon,
  Laptop as LaptopIcon,
  Router as RouterIcon,
  Antenna as AntennaIcon,
  Megaphone as MegaphoneIcon,
  GraduationCap as GraduationCapIcon,
  Briefcase as BriefcaseIcon,
  PiggyBank as PiggyBankIcon,
  ChartBarIncreasing as ChartBarIncreasingIcon,
  ChartBarDecreasing as ChartBarDecreasingIcon,
  ChartCandlestick as ChartCandlestickIcon,
  ChartArea as ChartAreaIcon,
  ChartGantt as ChartGanttIcon,
  BrainCircuit as BrainCircuitIcon,
  Webhook as WebhookIcon,
  GitPullRequest as GitPullRequestIcon,
  GitCommit as GitCommitIcon,
  GitMerge as GitMergeIcon,
  GitCompare as GitCompareIcon,
  Brackets as BracketsIcon,
  Parentheses as ParenthesesIcon,
  Asterisk as AsteriskIcon,
  Hash as HashIcon2,
  Infinity as InfinityIcon,
  Pi as PiIcon,
  Omega as OmegaIcon,
  Sigma as SigmaIcon,
  Copyright as CopyrightIcon,
  PhoneCall as PhoneCallIcon,
  PhoneOff as PhoneOffIcon,
  MessageCircle as MessageCircleIcon,
  MessagesSquare as MessagesSquareIcon,
  Inbox as InboxIcon,
  Send as SendIcon,
  MailOpen as MailOpenIcon,
  Mailbox as MailboxIcon,
  BellDot as BellDotIcon,
  AlarmSmoke as AlarmSmokeIcon,
  CalendarHeart as CalendarHeartIcon,
  ClockAlert as ClockAlertIcon,
  CloudDrizzle as CloudDrizzleIcon,
  CloudFog as CloudFogIcon,
  CloudHail as CloudHailIcon,
  CloudMoon as CloudMoonIcon,
  CloudSun as CloudSunIcon,
  Cloudy as CloudyIcon,
  Haze as HazeIcon,
  Rainbow as RainbowIcon,
  Tornado as TornadoIcon,
  Waves as WavesIcon,
  Flame as FlameIcon,
  EggFried as EggFriedIcon,
  IceCream as IceCreamIcon,
  Cookie as CookieIcon,
  Drumstick as DrumstickIcon,
  Soup as SoupIcon,
  Crown as CrownIcon,
  Scan as ScanIcon,
  QrCode as QrCodeIcon,
  Barcode as BarcodeIcon,
  RadioTower as RadioTowerIcon,
  Luggage as LuggageIcon,
  ChartBarStacked as ChartBarStackedIcon,
  Code2 as Code2Icon,
  ChevronsLeft as ChevronsLeftIcon,
  ChevronsRight as ChevronsRightIcon2,
  ChevronsUp as ChevronsUpIcon,
  ChevronsDown as ChevronsDownIcon2,
  PhoneForwarded as PhoneForwardedIcon,
  PhoneIncoming as PhoneIncomingIcon,
  PhoneMissed as PhoneMissedIcon,
  PhoneOutgoing as PhoneOutgoingIcon,
  Voicemail as VoicemailIcon,
  MessageSquareDashed as MessageSquareDashedIcon,
  MailWarning as MailWarningIcon,
  MailCheck as MailCheckIcon,
  MailX as MailXIcon,
  BellMinus as BellMinusIcon,
  BellPlus as BellPlusIcon,
  AlarmClockCheck as AlarmClockCheckIcon,
  AlarmClockMinus as AlarmClockMinusIcon,
  AlarmClockPlus as AlarmClockPlusIcon,
  CalendarClock as CalendarClockIcon,
  CalendarSearch as CalendarSearchIcon,
  ClockArrowDown as ClockArrowDownIcon,
  ClockArrowUp as ClockArrowUpIcon,
  CloudMoonRain as CloudMoonRainIcon,
  CloudRainWind as CloudRainWindIcon,
  CloudSunRain as CloudSunRainIcon,
  Moon as MoonIcon5,
  Snowflake as SnowflakeIcon3,
  SunDim as SunDimIcon,
  Thermometer as ThermometerIcon2,
  Droplets as DropletsIcon,
  Carrot as CarrotIcon,
  Beer as BeerIcon2,
  Candy as CandyIcon,
  Lollipop as LollipopIcon,
  Popcorn as PopcornIcon,
  Snail as SnailIcon,
  Worm as WormIcon,
  SatelliteDish as SatelliteDishIcon,
  ThermometerSnowflake as ThermometerSnowflakeIcon,
  Bone as BoneIcon,
  Ear as EarIcon,
  Hand as HandIcon,
  Footprints as FootprintsIcon,
  Usb as UsbIcon,
  Plug as PlugIcon,
  Construction as ConstructionIcon,
  Hammer as HammerIcon,
  Wrench as WrenchIcon,
  Paintbrush as PaintbrushIcon,
  Pencil as PencilIcon,
  Highlighter as HighlighterIcon,
  Eraser as EraserIcon,
  StickyNote as StickyNoteIcon,
  Paperclip as PaperclipIcon,
  Link as LinkIcon,
  Link2 as Link2Icon,
  LockKeyhole as LockKeyholeIcon,
  KeySquare as KeySquareIcon,
} from 'lucide-react';

// Import components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table as ShadcnTable, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';

// Types
interface AuditMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  change: number;
  description: string;
  category: 'performance' | 'security' | 'seo' | 'ux' | 'conversion' | 'technical';
}

interface EcommerceStore {
  id: string;
  name: string;
  url: string;
  platform: 'shopify' | 'woocommerce' | 'bigcommerce' | 'magento' | 'custom'| 'wix' | 'squarespace' | 'prestashop';
  status: 'active' | 'inactive' | 'auditing' | 'error';
 lastAudit: Date;
  score: number;
  issues: number;
  warnings: number;
  revenue: number;
  traffic: number;
  conversionRate: number;
  products: number;
  orders: number;
}

interface AuditIssue {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  impact: number;
  fixComplexity: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  estimatedCost: number;
  priority: number;
  status: 'open' | 'in_progress' | 'resolved' | 'ignored';
  detectedAt: Date;
  assignedTo?: string;
  tags: string[];
}

interface PerformanceData {
  timestamp: Date;
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
  serverResponseTime: number;
}

interface SecurityScan {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'warning';
  details: string;
  recommendations: string[];
  lastScan: Date;
}

interface SEOData {
  score: number;
  backlinks: number;
  domainAuthority: number;
  pageAuthority: number;
  keywordRankings: Array<{
    keyword: string;
    position: number;
    volume: number;
    difficulty: number;
  }>;
  indexedPages: number;
  crawlErrors: number;
}

interface ConversionData {
  rate: number;
  cartAbandonmentRate: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  bounceRate: number;
  exitRate: number;
}

// New Types for AI Audit Features
interface AIAuditResult {
  id: string;
  category: string;
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  issues: Array<{
    id: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    impact: number;
    fix: string;
    examples?: string[];
  }>;
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
    priority: number;
    estimatedTime: number;
    estimatedCost: number;
  }>;
  metrics: Record<string, number>;
  lastUpdated: Date;
}

interface StoreFormData {
  name: string;
  url: string;
  platform: 'shopify' | 'woocommerce' | 'bigcommerce' | 'magento' | 'custom' | 'wix' | 'squarespace' | 'prestashop';
  description: string;
  category: string;
  enableAIAudit: boolean;
  scanFrequency: 'daily' | 'weekly' | 'monthly' | 'manual';
  notifyOnIssues: boolean;
  teamMembers: string[];
  apiKey?: string;
  credentials?: {
    username?: string;
    password?: string;
    apiToken?: string;
  };
}

interface ScanResult {
  id: string;
  storeId: string;
  timestamp: Date;
  overallScore: number;
  categoryScores: Record<string, number>;
  issuesFound: number;
  warningsFound: number;
  recommendations: number;
  scanDuration: number;
  scanType: 'quick' | 'full' | 'ai';
  status: 'completed' | 'failed' | 'in_progress';
  data: any;
}

// Main Component
const EcommerceAudit: React.FC = () => {
  // State management
  const [stores, setStores] = useState<EcommerceStore[]>([
    {
      id: '1',
      name: 'FashionHub',
      url: 'https://fashionhub.com',
      platform: 'shopify',
      status: 'active',
      lastAudit: new Date('2024-01-15'),
      score: 87,
      issues: 12,
      warnings: 24,
      revenue: 125000,
      traffic: 250000,
      conversionRate: 3.2,
      products: 1450,
      orders: 2450,
    },
    {
      id: '2',
      name: 'TechGadgets',
      url: 'https://techgadgets.com',
      platform: 'magento',
      status: 'auditing',
      lastAudit: new Date('2024-01-14'),
      score: 65,
      issues: 42,
      warnings: 18,
      revenue: 89000,
      traffic: 180000,
      conversionRate: 1.8,
      products: 890,
      orders: 1600,
    },
    {
      id: '3',
      name: 'HomeEssentials',
      url: 'https://homeessentials.com',
      platform: 'woocommerce',
      status: 'active',
      lastAudit: new Date('2024-01-13'),
      score: 92,
      issues: 8,
      warnings: 15,
      revenue: 210000,
      traffic: 320000,
      conversionRate: 4.1,
      products: 2100,
      orders: 4200,
    },
  ]);

  const [selectedStore, setSelectedStore] = useState<EcommerceStore | null>(stores[0]);
  const [auditMetrics, setAuditMetrics] = useState<AuditMetric[]>([
    { id: '1', name: 'Page Load Time', value: 2.3, target: 2.0, unit: 's', status: 'warning', trend: 'up', change: 15, description: 'Time for page to fully load', category: 'performance' },
    { id: '2', name: 'SSL Security', value: 100, target: 100, unit: '%', status: 'good', trend: 'stable', change: 0, description: 'SSL certificate validity', category: 'security' },
    { id: '3', name: 'Mobile Responsiveness', value: 95, target: 95, unit: '%', status: 'good', trend: 'up', change: 5, description: 'Mobile compatibility score', category: 'ux' },
    { id: '4', name: 'Conversion Rate', value: 3.2, target: 4.0, unit: '%', status: 'warning', trend: 'down', change: -12, description: 'Visitor to customer conversion', category: 'conversion' },
    { id: '5', name: 'SEO Score', value: 78, target: 85, unit: '/100', status: 'warning', trend: 'up', change: 8, description: 'Overall SEO performance', category: 'seo' },
    { id: '6', name: 'Server Uptime', value: 99.8, target: 99.9, unit: '%', status: 'good', trend: 'stable', change: 0.1, description: 'Website availability', category: 'technical' },
  ]);

  const [auditIssues, setAuditIssues] = useState<AuditIssue[]>([
  { 
    id: '1', 
    title: 'Slow Image Loading', 
    description: 'Large uncompressed images affecting page speed', 
    severity: 'high', 
    category: 'performance', 
    impact: 85, 
    fixComplexity: 'easy', 
    estimatedTime: 2, 
    estimatedCost: 150, 
    priority: 1, 
    status: 'open', 
    detectedAt: new Date('2024-01-15'), 
    tags: ['performance', 'images'] 
  },
  { 
    id: '2', 
    title: 'Missing Meta Descriptions', 
    description: '40% of product pages lack meta descriptions', 
    severity: 'medium', 
    category: 'seo', 
    impact: 65, 
    fixComplexity: 'medium', 
    estimatedTime: 8, 
    estimatedCost: 400, 
    priority: 2, 
    status: 'in_progress', 
    detectedAt: new Date('2024-01-15'),
    assignedTo: 'John Doe', 
    tags: ['seo', 'content'] 
  },
  { 
    id: '3', 
    title: 'Cart Abandonment', 
    description: 'High cart abandonment rate at checkout step 2', 
    severity: 'critical', 
    category: 'conversion', 
    impact: 95, 
    fixComplexity: 'hard', 
    estimatedTime: 20, 
    estimatedCost: 1200, 
    priority: 1, 
    status: 'open', 
    detectedAt: new Date('2024-01-14'), 
    tags: ['conversion', 'checkout'] 
  },
  { 
    id: '4', 
    title: 'SSL Configuration', 
    description: 'Mixed content warnings on secure pages', 
    severity: 'high', 
    category: 'security', 
    impact: 90, 
    fixComplexity: 'medium', 
    estimatedTime: 4, 
    estimatedCost: 300, 
    priority: 1, 
    status: 'resolved', 
    detectedAt: new Date('2024-01-13'), 
    tags: ['security', 'ssl'] 
  },
  { 
    id: '5', 
    title: 'Mobile Navigation', 
    description: 'Navigation menu not optimized for mobile devices', 
    severity: 'medium', 
    category: 'ux', 
    impact: 70, 
    fixComplexity: 'medium', 
    estimatedTime: 6, 
    estimatedCost: 350, 
    priority: 3, 
    status: 'open', 
    detectedAt: new Date('2024-01-12'), 
    tags: ['ux', 'mobile'] 
  },
]);

  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([
    { timestamp: new Date('2024-01-15'), pageLoadTime: 2.3, firstContentfulPaint: 1.2, largestContentfulPaint: 2.1, cumulativeLayoutShift: 0.15, firstInputDelay: 45, timeToInteractive: 2.8, serverResponseTime: 320 },
    { timestamp: new Date('2024-01-14'), pageLoadTime: 2.1, firstContentfulPaint: 1.1, largestContentfulPaint: 2.0, cumulativeLayoutShift: 0.12, firstInputDelay: 42, timeToInteractive: 2.5, serverResponseTime: 310 },
    { timestamp: new Date('2024-01-13'), pageLoadTime: 2.5, firstContentfulPaint: 1.3, largestContentfulPaint: 2.3, cumulativeLayoutShift: 0.18, firstInputDelay: 48, timeToInteractive: 3.0, serverResponseTime: 350 },
  ]);

  const [securityScans, setSecurityScans] = useState<SecurityScan[]>([
    { id: '1', name: 'Vulnerability Scan', status: 'passed', details: 'No critical vulnerabilities found', recommendations: ['Update to latest PHP version'], lastScan: new Date('2024-01-15') },
    { id: '2', name: 'Malware Detection', status: 'passed', details: 'Clean scan, no malware detected', recommendations: [], lastScan: new Date('2024-01-15') },
    { id: '3', name: 'SSL/TLS Check', status: 'warning', details: 'TLS 1.0 and 1.1 still enabled', recommendations: ['Disable TLS 1.0 and 1.1'], lastScan: new Date('2024-01-15') },
    { id: '4', name: 'Firewall Configuration', status: 'passed', details: 'Firewall properly configured', recommendations: [], lastScan: new Date('2024-01-15') },
  ]);

  const [seoData, setSeoData] = useState<SEOData>({
    score: 78,
    backlinks: 2450,
    domainAuthority: 45,
    pageAuthority: 38,
    keywordRankings: [
      { keyword: 'ecommerce platform', position: 12, volume: 5400, difficulty: 65 },
      { keyword: 'online shopping', position: 8, volume: 12100, difficulty: 78 },
      { keyword: 'buy fashion online', position: 15, volume: 3200, difficulty: 45 },
    ],
    indexedPages: 1250,
    crawlErrors: 24,
  });

  const [conversionData, setConversionData] = useState<ConversionData>({
    rate: 3.2,
    cartAbandonmentRate: 68.5,
    averageOrderValue: 89.50,
    customerLifetimeValue: 450,
    bounceRate: 42.3,
    exitRate: 35.7,
  });

  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('priority');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [autoAudit, setAutoAudit] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  // New state for store management
  const [showAddStoreForm, setShowAddStoreForm] = useState(false);
  const [storeFormData, setStoreFormData] = useState<StoreFormData>({
    name: '',
    url: '',
    platform: 'shopify',
    description: '',
    category: 'general',
    enableAIAudit: true,
    scanFrequency: 'weekly',
    notifyOnIssues: true,
    teamMembers: [],
    apiKey: '',
    credentials: {},
  });

  const [editingStore, setEditingStore] = useState<EcommerceStore | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [bulkActions, setBulkActions] = useState<string[]>([]);
  const [importExportDialog, setImportExportDialog] = useState<'import' | 'export' | null>(null);
  const [auditUrl, setAuditUrl] = useState<string>('');

  const [aiAuditResults, setAiAuditResults] = useState<AIAuditResult[]>([
    {
      id: 'search-performance',
      category: 'Search Performance Score',
      score: 75,
      maxScore: 100,
      status: 'fair',
      issues: [
        {
          id: 'sp-1',
          title: 'Poor Search Relevance',
          description: 'Search results don\'t closely match user queries',
          severity: 'high',
          impact: 65,
          fix: 'Implement semantic search and improve keyword matching',
          examples: ['Searching for "running shoes" shows dress shoes'],
        },
        {
          id: 'sp-2',
          title: 'Missing Synonym Support',
          description: 'Search doesn\'t understand related terms',
          severity: 'medium',
          impact: 45,
          fix: 'Add synonym dictionary and semantic understanding',
        },
        {
          id: 'sp-3',
          title: 'Slow Search Response',
          description: 'Search takes over 2 seconds to return results',
          severity: 'high',
          impact: 70,
          fix: 'Optimize search index and implement caching',
        },
      ],
      recommendations: [
        {
          id: 'rec-sp-1',
          title: 'Implement Algolia Search',
          description: 'Upgrade to enterprise-grade search solution',
          priority: 1,
          estimatedTime: 8,
          estimatedCost: 500,
        },
        {
          id: 'rec-sp-2',
          title: 'Add Typo Tolerance',
          description: 'Implement fuzzy search and autocorrect',
          priority: 2,
          estimatedTime: 4,
          estimatedCost: 200,
        },
      ],
      metrics: {
        searchSpeed: 2300,
        relevanceScore: 68,
        conversionRate: 2.3,
        userSatisfaction: 72,
      },
      lastUpdated: new Date(),
    },
    {
      id: 'navigation',
      category: 'Navigation Score',
      score: 82,
      maxScore: 100,
      status: 'good',
      issues: [
        {
          id: 'nav-1',
          title: 'Complex Menu Structure',
          description: 'Too many menu levels confuse users',
          severity: 'medium',
          impact: 55,
          fix: 'Simplify menu to maximum 3 levels',
        },
        {
          id: 'nav-2',
          title: 'Missing Breadcrumbs',
          description: 'No breadcrumb navigation on product pages',
          severity: 'low',
          impact: 30,
          fix: 'Implement breadcrumb navigation system',
        },
      ],
      recommendations: [
        {
          id: 'rec-nav-1',
          title: 'Implement Mega Menu',
          description: 'Add visual mega menu for better categorization',
          priority: 2,
          estimatedTime: 6,
          estimatedCost: 300,
        },
        {
          id: 'rec-nav-2',
          title: 'Add Breadcrumb Navigation',
          description: 'Implement hierarchical navigation trail',
          priority: 3,
          estimatedTime: 4,
          estimatedCost: 150,
        },
      ],
      metrics: {
        menuDepth: 4,
        bounceRate: 38,
        timeToFind: 12.5,
        satisfaction: 85,
      },
      lastUpdated: new Date(),
    },
    {
      id: 'product-page',
      category: 'Product Page Optimization Score',
      score: 65,
      maxScore: 100,
      status: 'fair',
      issues: [
        {
          id: 'pp-1',
          title: 'Incomplete Product Information',
          description: 'Missing specifications and detailed descriptions',
          severity: 'high',
          impact: 75,
          fix: 'Add comprehensive product specs and descriptions',
        },
        {
          id: 'pp-2',
          title: 'Poor Image Quality',
          description: 'Product images are low resolution and inconsistent',
          severity: 'medium',
          impact: 60,
          fix: 'Standardize product photography and increase resolution',
        },
      ],
      recommendations: [
        {
          id: 'rec-pp-1',
          title: 'Add 360° Product Views',
          description: 'Implement interactive product visualization',
          priority: 1,
          estimatedTime: 10,
          estimatedCost: 800,
        },
        {
          id: 'rec-pp-2',
          title: 'Implement Size Guides',
          description: 'Add interactive size guides for apparel',
          priority: 2,
          estimatedTime: 5,
          estimatedCost: 250,
        },
      ],
      metrics: {
        completeness: 60,
        imageCount: 3,
        videoPresence: 0,
        reviewCount: 12,
      },
      lastUpdated: new Date(),
    },
    {
      id: 'metadata',
      category: 'Missing Metadata & Tags',
      score: 58,
      maxScore: 100,
      status: 'poor',
      issues: [
        {
          id: 'meta-1',
          title: 'Missing ALT Tags',
          description: '45% of product images lack ALT text',
          severity: 'critical',
          impact: 90,
          fix: 'Add descriptive ALT tags to all images',
        },
        {
          id: 'meta-2',
          title: 'Duplicate Meta Descriptions',
          description: 'Multiple pages share the same meta descriptions',
          severity: 'high',
          impact: 80,
          fix: 'Create unique meta descriptions for each page',
        },
      ],
      recommendations: [
        {
          id: 'rec-meta-1',
          title: 'Implement Schema.org',
          description: 'Add structured data for better SEO',
          priority: 1,
          estimatedTime: 12,
          estimatedCost: 400,
        },
        {
          id: 'rec-meta-2',
          title: 'Automate Meta Tag Generation',
          description: 'Use AI to generate unique meta descriptions',
          priority: 2,
          estimatedTime: 8,
          estimatedCost: 300,
        },
      ],
      metrics: {
        altTags: 55,
        metaDescriptions: 40,
        schemaMarkup: 10,
        ogTags: 35,
      },
      lastUpdated: new Date(),
    },
    {
      id: 'image-quality',
      category: 'Image Quality Score',
      score: 71,
      maxScore: 100,
      status: 'fair',
      issues: [
        {
          id: 'img-1',
          title: 'Low Resolution Images',
          description: 'Product images are below recommended resolution',
          severity: 'medium',
          impact: 50,
          fix: 'Replace with high-resolution images',
        },
        {
          id: 'img-2',
          title: 'Inconsistent Styling',
          description: 'Product photos have different backgrounds and lighting',
          severity: 'medium',
          impact: 45,
          fix: 'Standardize product photography style',
        },
      ],
      recommendations: [
        {
          id: 'rec-img-1',
          title: 'Professional Product Photography',
          description: 'Hire photographer for consistent quality',
          priority: 2,
          estimatedTime: 20,
          estimatedCost: 1500,
        },
        {
          id: 'rec-img-2',
          title: 'Image Optimization Service',
          description: 'Use automated image optimization tool',
          priority: 1,
          estimatedTime: 5,
          estimatedCost: 200,
        },
      ],
      metrics: {
        resolution: 1024,
        consistency: 65,
        lighting: 70,
        angles: 2,
      },
      lastUpdated: new Date(),
    },
    {
      id: 'recommendations',
      category: 'Recommendation Readiness Score',
      score: 45,
      maxScore: 100,
      status: 'poor',
      issues: [
        {
          id: 'rec-1',
          title: 'No Recommendation Engine',
          description: 'Store lacks personalized recommendations',
          severity: 'critical',
          impact: 85,
          fix: 'Implement AI-powered recommendation system',
        },
        {
          id: 'rec-2',
          title: 'Basic "Related Products"',
          description: 'Only shows manually selected related products',
          severity: 'high',
          impact: 70,
          fix: 'Implement dynamic product recommendations',
        },
      ],
      recommendations: [
        {
          id: 'rec-rec-1',
          title: 'Install RecomAI Engine',
          description: 'AI-powered product recommendation system',
          priority: 1,
          estimatedTime: 15,
          estimatedCost: 1200,
        },
        {
          id: 'rec-rec-2',
          title: 'Add "Frequently Bought Together"',
          description: 'Implement bundle recommendations',
          priority: 2,
          estimatedTime: 8,
          estimatedCost: 400,
        },
      ],
      metrics: {
        personalization: 10,
        crossSell: 20,
        upSell: 15,
        engagement: 25,
      },
      lastUpdated: new Date(),
    },
  ]);

  const [scanHistory, setScanHistory] = useState<ScanResult[]>([
    {
      id: 'scan-1',
      storeId: '1',
      timestamp: new Date('2024-01-15T10:30:00'),
      overallScore: 87,
      categoryScores: {
        performance: 85,
        security: 95,
        seo: 78,
        ux: 82,
        conversion: 79,
        technical: 90,
      },
      issuesFound: 12,
      warningsFound: 24,
      recommendations: 18,
      scanDuration: 145,
      scanType: 'full',
      status: 'completed',
      data: {},
    },
    {
      id: 'scan-2',
      storeId: '1',
      timestamp: new Date('2024-01-14T14:20:00'),
      overallScore: 82,
      categoryScores: {
        performance: 80,
        security: 95,
        seo: 75,
        ux: 80,
        conversion: 76,
        technical: 88,
      },
      issuesFound: 18,
      warningsFound: 30,
      recommendations: 22,
      scanDuration: 130,
      scanType: 'full',
      status: 'completed',
      data: {},
    },
    {
      id: 'scan-3',
      storeId: '2',
      timestamp: new Date('2024-01-13T09:15:00'),
      overallScore: 65,
      categoryScores: {
        performance: 60,
        security: 70,
        seo: 55,
        ux: 65,
        conversion: 58,
        technical: 75,
      },
      issuesFound: 42,
      warningsFound: 18,
      recommendations: 28,
      scanDuration: 180,
      scanType: 'ai',
      status: 'completed',
      data: {},
    },
  ]);

  const [showAIAuditDetails, setShowAIAuditDetails] = useState<string | null>(null);
  const [scanQueue, setScanQueue] = useState<string[]>([]);
  const [importData, setImportData] = useState<string>('');
  const [exportData, setExportData] = useState<string>('');

  // Refs for animations
  const progressBarRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    if (isAuditing) {
      const interval = setInterval(() => {
        setAuditProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAuditing(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isAuditing]);

  useEffect(() => {
    // Simulate real-time updates
    if (realTimeUpdates) {
      const interval = setInterval(() => {
        setPerformanceData(prev => {
          const newData = [...prev];
          const latest = { ...newData[newData.length - 1] };
          latest.pageLoadTime += (Math.random() - 0.5) * 0.1;
          latest.firstContentfulPaint += (Math.random() - 0.5) * 0.05;
          newData.push({ ...latest, timestamp: new Date() });
          if (newData.length > 10) newData.shift();
          return newData;
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [realTimeUpdates]);

  // Handlers
  const handleStartAudit = () => {
    if (selectedStore) {
      setIsAuditing(true);
      setAuditProgress(0);
      setAuditUrl(selectedStore.url);
    }
  };

  // Store management handlers
  const validateStoreForm = (): boolean => {
    if (!storeFormData.name.trim()) {
      alert('Store name is required');
      return false;
    }
    
    if (!storeFormData.url.trim()) {
      alert('Store URL is required');
      return false;
    }
    
    try {
      new URL(storeFormData.url);
    } catch (e) {
      alert('Please enter a valid URL (include https://)');
      return false;
    }
    
    return true;
  };

  const handleAddStore = () => {
  if (!validateStoreForm()) return;

  const newStore: EcommerceStore = {
    id: `store-${Date.now()}`,
    name: storeFormData.name.trim(),
    url: storeFormData.url.trim(),
    platform: storeFormData.platform as EcommerceStore['platform'], // Cast to ensure type safety
    status: 'inactive',
    lastAudit: new Date(),
    score: 0,
    issues: 0,
    warnings: 0,
    revenue: 0,
    traffic: 0,
    conversionRate: 0,
    products: 0,
    orders: 0,
  };

  setStores(prev => [...prev, newStore]);
  setSelectedStore(newStore);
  resetStoreForm();
  setShowAddStoreForm(false);
  
  setTimeout(() => {
    alert(`Store "${newStore.name}" added successfully!`);
  }, 100);
};

  const handleEditStore = (store: EcommerceStore) => {
    setEditingStore(store);
    setStoreFormData({
      name: store.name,
      url: store.url,
      platform: store.platform,
      description: '',
      category: 'general',
      enableAIAudit: true,
      scanFrequency: 'weekly',
      notifyOnIssues: true,
      teamMembers: [],
      apiKey: '',
      credentials: {},
    });
    setShowAddStoreForm(true);
  };

  const handleUpdateStore = () => {
  if (!editingStore || !validateStoreForm()) return;

  const updatedStores = stores.map(store => 
    store.id === editingStore.id 
      ? { 
          ...store, 
          name: storeFormData.name.trim(),
          url: storeFormData.url.trim(),
          platform: storeFormData.platform as EcommerceStore['platform'],
        }
      : store
  );

  setStores(updatedStores);
  setSelectedStore(updatedStores.find(s => s.id === editingStore.id) || null);
  resetStoreForm();
  setShowAddStoreForm(false);
  setEditingStore(null);
  
  alert(`Store "${storeFormData.name}" updated successfully!`);
};
    

  const handleDeleteStore = (storeId: string) => {
    const storeToDelete = stores.find(s => s.id === storeId);
    if (!storeToDelete) return;

    setStores(stores.filter(store => store.id !== storeId));
    if (selectedStore?.id === storeId) {
      setSelectedStore(stores.length > 1 ? stores.find(s => s.id !== storeId) || null : null);
    }
    setShowDeleteConfirm(null);
    
    alert(`Store "${storeToDelete.name}" deleted successfully!`);
  };

  const handleBulkDelete = () => {
    if (bulkActions.length === 0) return;
    
    const storeNames = stores
      .filter(s => bulkActions.includes(s.id))
      .map(s => s.name)
      .join(', ');

    if (window.confirm(`Are you sure you want to delete ${bulkActions.length} store(s)?\n\n${storeNames}`)) {
      setStores(stores.filter(store => !bulkActions.includes(store.id)));
      if (selectedStore && bulkActions.includes(selectedStore.id)) {
        const remainingStores = stores.filter(store => !bulkActions.includes(store.id));
        setSelectedStore(remainingStores.length > 0 ? remainingStores[0] : null);
      }
      setBulkActions([]);
      
      alert(`${bulkActions.length} store(s) deleted successfully!`);
    }
  };

  const handleBulkAudit = () => {
  if (bulkActions.length === 0) return;
  
  const storesToAudit = stores.filter(s => bulkActions.includes(s.id));
  setScanQueue(storesToAudit.map(s => s.id));
  setIsAuditing(true);
  setAuditProgress(0);
  
  // Simulate audit progress
  const interval = setInterval(() => {
    setAuditProgress(prev => {
      if (prev >= 100) {
        clearInterval(interval);
        setIsAuditing(false);
        setScanQueue([]);
          
         // Update stores with simulated results
        const updatedStores = stores.map(store => {
          if (bulkActions.includes(store.id)) {
            return {
              ...store,
              status: 'active',
              lastAudit: new Date(),
              score: Math.floor(Math.random() * 30) + 65,
              issues: Math.floor(Math.random() * 15) + 5,
              warnings: Math.floor(Math.random() * 25) + 10,
            };
          }
          return store;
        });
        
        setStores(updatedStores);
        if (selectedStore && bulkActions.includes(selectedStore.id)) {
          setSelectedStore(updatedStores.find(s => s.id === selectedStore.id) || null);
        }
        
        const oldBulkActions = [...bulkActions];
        setBulkActions([]);
        alert(`${oldBulkActions.length} stores audited successfully!`);
        return 100;
      }
      return prev + 5;
    });
  }, 300);
};

  const handleRunAIAudit = (storeId?: string) => {
  const targetStoreId = storeId || selectedStore?.id;
  if (!targetStoreId) {
    alert('Please select a store first');
    return;
  }

  setIsAuditing(true);
  setAuditProgress(0);
  
  if (bulkActions.length > 1 && !storeId) {
    setScanQueue(bulkActions);
  } else {
    setScanQueue([targetStoreId]);
  }

      // Simulate AI audit process
  const steps = [
    "Initializing AI Scanner...",
    "Crawling website structure...",
    "Analyzing page performance...",
    "Checking SEO elements...",
    "Evaluating user experience...",
    "Scanning for security issues...",
    "Generating recommendations...",
    "Compiling final report..."
  ];
  
  let currentStep = 0;
  
  const interval = setInterval(() => {
    setAuditProgress(prev => {
      if (prev >= 100) {
        clearInterval(interval);
        setIsAuditing(false);
   // Process completed audits
        const completedScans: ScanResult[] = [];
        
        scanQueue.forEach(storeId => {
          const store = stores.find(s => s.id === storeId);
          if (store) {
            // Generate random but realistic scores for AI audit categories
            const newAiAuditResults = aiAuditResults.map(category => ({
              ...category,
              score: Math.min(100, Math.max(20, category.score + (Math.random() * 20 - 10))),
              lastUpdated: new Date(),
            }));
            
            setAiAuditResults(newAiAuditResults);
              
             // Update store with audit results
            const updatedStore: EcommerceStore = { 
              ...store, 
              status: 'active',
              lastAudit: new Date(),
              score: Math.floor(Math.random() * 30) + 65,
              issues: Math.floor(Math.random() * 15) + 5,
              warnings: Math.floor(Math.random() * 25) + 10,
            };
            
            // Update stores list
            setStores(prev => prev.map(s => 
              s.id === storeId ? updatedStore : s
            ));
 // Add to scan history
            const newScan: ScanResult = {
              id: `scan-${Date.now()}-${storeId}`,
              storeId,
              timestamp: new Date(),
              overallScore: updatedStore.score,
              categoryScores: {
                performance: Math.floor(Math.random() * 30) + 65,
                security: Math.floor(Math.random() * 30) + 65,
                seo: Math.floor(Math.random() * 30) + 65,
                ux: Math.floor(Math.random() * 30) + 65,
                conversion: Math.floor(Math.random() * 30) + 65,
                technical: Math.floor(Math.random() * 30) + 65,
              },
              issuesFound: updatedStore.issues,
              warningsFound: updatedStore.warnings,
              recommendations: Math.floor(Math.random() * 20) + 5,
              scanDuration: Math.floor(Math.random() * 120) + 60,
              scanType: 'ai',
              status: 'completed',
              data: {},
            };
            
            completedScans.push(newScan);
          }
        });
        
        // Update scan history
        setScanHistory([...completedScans, ...scanHistory.slice(0, 50 - completedScans.length)]);
        
        // Clear queue
        setScanQueue([]);
        
        // Update selected store if it was audited
        if (selectedStore && scanQueue.includes(selectedStore.id)) {
          const updatedSelected = stores.find(s => s.id === selectedStore.id);
          setSelectedStore(updatedSelected || null);
        }
        
        // Show success message
        if (bulkActions.length > 1 && !storeId) {
          alert(`${bulkActions.length} stores audited successfully!`);
          setBulkActions([]);
        } else {
          alert('AI Audit completed successfully!');
        }
        
        return 100;
      }
      
      // Update step every 12.5%
      if (prev % 12.5 === 0 && currentStep < steps.length - 1) {
        currentStep++;
      }
      
      return prev + 2.5;
    });
  }, 300);
};
          

  const resetStoreForm = () => {
    setStoreFormData({
      name: '',
      url: '',
      platform: 'shopify',
      description: '',
      category: 'general',
      enableAIAudit: true,
      scanFrequency: 'weekly',
      notifyOnIssues: true,
      teamMembers: [],
      apiKey: '',
      credentials: {},
    });
    setEditingStore(null);
  };

  const handleResolveIssue = (issueId: string) => {
    setAuditIssues(prev => prev.map(issue => 
      issue.id === issueId ? { ...issue, status: 'resolved' } : issue
    ));
  };

  const handleAssignIssue = (issueId: string, assignee: string) => {
  setAuditIssues(prev => prev.map(issue => 
    issue.id === issueId ? { 
      ...issue, 
      assignedTo: assignee, 
      status: 'in_progress',
      detectedAt: issue.detectedAt // Keep the existing detectedAt
    } : issue
  ));
};

  const handleExportReport = () => {
    if (!selectedStore) return;
    
    const report = {
      store: selectedStore,
      metrics: auditMetrics,
      issues: auditIssues,
      performance: performanceData,
      security: securityScans,
      seo: seoData,
      conversion: conversionData,
      aiAuditResults: aiAuditResults,
      scanHistory: scanHistory.filter(s => s.storeId === selectedStore.id),
      generatedAt: new Date(),
    };
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `ecommerce-audit-${selectedStore.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

 const handleImportStores = () => {
  try {
    const importedData = JSON.parse(importData);
    const newStores: EcommerceStore[] = importedData.map((item: any, index: number) => ({
      id: `imported-${Date.now()}-${index}`,
      name: item.name || `Imported Store ${index + 1}`,
      url: item.url || '',
      platform: (item.platform as EcommerceStore['platform']) || 'shopify',
      status: 'inactive',
      lastAudit: new Date(),
      score: item.score || 0,
      issues: item.issues || 0,
      warnings: item.warnings || 0,
      revenue: item.revenue || 0,
      traffic: item.traffic || 0,
      conversionRate: item.conversionRate || 0,
      products: item.products || 0,
      orders: item.orders || 0,
    }));

    setStores([...stores, ...newStores]);
    setImportData('');
    setImportExportDialog(null);
    alert(`${newStores.length} stores imported successfully!`);
  } catch (error) {
    alert('Invalid JSON format. Please check your import data.');
  }
};


  const handleExportStores = () => {
    const exportData = JSON.stringify(stores, null, 2);
    setExportData(exportData);
    
    // Create download link
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecommerce-stores-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setImportExportDialog(null);
  };

  const handleCopyExportData = () => {
    navigator.clipboard.writeText(exportData);
    alert('Export data copied to clipboard!');
  };

  // Filter and sort functions
  const filteredIssues = auditIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || issue.category === filterCategory;
    const matchesSeverity = filterSeverity === 'all' || issue.severity === filterSeverity;
    return matchesSearch && matchesCategory && matchesSeverity;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'priority': return b.priority - a.priority;
      case 'impact': return b.impact - a.impact;
      case 'severity': 
        const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return severityOrder[a.severity] - severityOrder[b.severity];
      case 'date': return new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime();
      default: return 0;
    }
  });

  // Calculate statistics
  const totalIssues = auditIssues.length;
  const criticalIssues = auditIssues.filter(i => i.severity === 'critical').length;
  const openIssues = auditIssues.filter(i => i.status === 'open').length;
  const estimatedTotalCost = auditIssues.reduce((sum, issue) => sum + issue.estimatedCost, 0);
  const estimatedTotalTime = auditIssues.reduce((sum, issue) => sum + issue.estimatedTime, 0);

  // Calculate store statistics
  const storeStatistics = {
    totalStores: stores.length,
    activeStores: stores.filter(s => s.status === 'active').length,
    totalRevenue: stores.reduce((sum, store) => sum + store.revenue, 0),
    totalIssues: stores.reduce((sum, store) => sum + store.issues, 0),
    averageScore: stores.length > 0 ? stores.reduce((sum, store) => sum + store.score, 0) / stores.length : 0,
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const pulseAnimation = {
    animate: { 
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity }
    }
  };

  const rotateAnimation = {
    animate: { 
      rotate: 360,
      transition: { duration: 20, repeat: Infinity, ease: "linear" }
    }
  };

  // Add Store Form Modal Component
  const AddStoreFormModal = () => {
    return (
      <Dialog open={showAddStoreForm} onOpenChange={(open) => {
        if (!open) {
          setShowAddStoreForm(false);
          setEditingStore(null);
          resetStoreForm();
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingStore ? 'Edit Store' : 'Add New Store'}</DialogTitle>
            <DialogDescription>
              {editingStore 
                ? 'Update your store details and configuration'
                : 'Add a new ecommerce store to monitor and audit'
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            editingStore ? handleUpdateStore() : handleAddStore();
          }}>
            <div className="space-y-6 py-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center">
                      Store Name <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={storeFormData.name}
                      onChange={(e) => setStoreFormData({...storeFormData, name: e.target.value})}
                      placeholder="My Awesome Store"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url" className="flex items-center">
                      Store URL <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="url"
                      type="url"
                      value={storeFormData.url}
                      onChange={(e) => setStoreFormData({...storeFormData, url: e.target.value})}
                      placeholder="https://example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select
                    value={storeFormData.platform}
                    onValueChange={(value: any) => setStoreFormData({...storeFormData, platform: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="woocommerce">WooCommerce</SelectItem>
                      <SelectItem value="bigcommerce">BigCommerce</SelectItem>
                      <SelectItem value="magento">Magento</SelectItem>
                      <SelectItem value="wix">Wix</SelectItem>
                      <SelectItem value="squarespace">Squarespace</SelectItem>
                      <SelectItem value="prestashop">PrestaShop</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={storeFormData.description}
                    onChange={(e) => setStoreFormData({...storeFormData, description: e.target.value})}
                    placeholder="Brief description of your store..."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category (Optional)</Label>
                  <Input
                    id="category"
                    value={storeFormData.category}
                    onChange={(e) => setStoreFormData({...storeFormData, category: e.target.value})}
                    placeholder="Fashion, Electronics, Home Goods, etc."
                  />
                </div>
              </div>
              
              {/* Audit Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Audit Configuration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ai-audit">Enable AI-Powered Analysis</Label>
                      <p className="text-sm text-gray-500">Use AI to identify optimization opportunities</p>
                    </div>
                    <Switch
                      id="ai-audit"
                      checked={storeFormData.enableAIAudit}
                      onCheckedChange={(checked) => setStoreFormData({...storeFormData, enableAIAudit: checked})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Scan Frequency</Label>
                    <Select
                      value={storeFormData.scanFrequency}
                      onValueChange={(value: any) => setStoreFormData({...storeFormData, scanFrequency: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="manual">Manual Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Notify on Issues</Label>
                      <p className="text-sm text-gray-500">Receive alerts when issues are detected</p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={storeFormData.notifyOnIssues}
                      onCheckedChange={(checked) => setStoreFormData({...storeFormData, notifyOnIssues: checked})}
                    />
                  </div>
                </div>
              </div>
              
              {/* API Configuration (Optional) */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">API Configuration (Optional)</h3>
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={storeFormData.apiKey}
                    onChange={(e) => setStoreFormData({...storeFormData, apiKey: e.target.value})}
                    placeholder="Enter API key for automated scans"
                  />
                  <p className="text-sm text-gray-500">Required for automated scans and real-time monitoring</p>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddStoreForm(false);
                  setEditingStore(null);
                  resetStoreForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingStore ? 'Update Store' : 'Add Store'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  // Delete Confirmation Dialog Component
  const DeleteConfirmationDialog = () => {
    const storeToDelete = stores.find(s => s.id === showDeleteConfirm);
    
    return (
      <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the store and all its audit data.
            </DialogDescription>
          </DialogHeader>
          
          {storeToDelete && (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  You are about to delete: <strong>{storeToDelete.name}</strong>
                </AlertDescription>
              </Alert>
              
              <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20 p-4">
                <div className="flex items-center gap-3">
                  <Store className="h-8 w-8 text-red-500" />
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">{storeToDelete.name}</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">{storeToDelete.url}</p>
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <span className="text-gray-600 dark:text-gray-400">Platform:</span>
                    <div className="font-medium capitalize">{storeToDelete.platform}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-600 dark:text-gray-400">Last Audit:</span>
                    <div className="font-medium">
                      {new Date(storeToDelete.lastAudit).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-600 dark:text-gray-400">Score:</span>
                    <div className="font-medium">{storeToDelete.score}/100</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-600 dark:text-gray-400">Issues:</span>
                    <div className="font-medium text-red-600">{storeToDelete.issues} open</div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md bg-gray-50 dark:bg-gray-800 p-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Note:</strong> All audit history, reports, and configurations for this store will be permanently deleted.
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (showDeleteConfirm) {
                  handleDeleteStore(showDeleteConfirm);
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  // Import/Export Dialog Component
  const ImportExportDialog = () => {
    return (
      <Dialog open={!!importExportDialog} onOpenChange={() => setImportExportDialog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {importExportDialog === 'import' ? 'Import Stores' : 'Export Stores'}
            </DialogTitle>
            <DialogDescription>
              {importExportDialog === 'import' 
                ? 'Import stores from JSON format'
                : 'Export your stores data to JSON format'}
            </DialogDescription>
          </DialogHeader>
          
          {importExportDialog === 'import' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Paste JSON Data</Label>
                <Textarea
                  placeholder='[{"name": "Store Name", "url": "https://store.com", "platform": "shopify", ...}]'
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
              <div className="rounded-md bg-gray-50 dark:bg-gray-800 p-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Format:</strong> Array of store objects with name, url, platform, and optional metadata.
                </p>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setImportExportDialog(null)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleImportStores}
                  disabled={!importData.trim()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Stores
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Export Data</Label>
                <div className="rounded-md border p-3 bg-gray-50 dark:bg-gray-800">
                  <pre className="text-sm overflow-auto max-h-60">
                    {exportData || 'Click "Generate Export" to create export data'}
                  </pre>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {stores.length} stores available for export
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyExportData}
                    disabled={!exportData}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportStores}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setImportExportDialog(null)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    const data = JSON.stringify(stores, null, 2);
                    setExportData(data);
                  }}
                >
                  <Database className="h-4 w-4 mr-2" />
                  Generate Export
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  };

  // AI Audit Results Component
  const AIAuditResults = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Audit Results</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive analysis across 6 key ecommerce categories
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => handleRunAIAudit(selectedStore?.id)}
              disabled={!selectedStore || isAuditing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isAuditing ? 'animate-spin' : ''}`} />
              Refresh AI Audit
            </Button>
            <Button
              onClick={() => {
                const report = {
                  store: selectedStore,
                  aiAuditResults,
                  timestamp: new Date()
                };
                const dataStr = JSON.stringify(report, null, 2);
                const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                const linkElement = document.createElement('a');
                linkElement.setAttribute('href', dataUri);
                linkElement.setAttribute('download', `ai-audit-${selectedStore?.name?.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`);
                linkElement.click();
              }}
              disabled={!selectedStore}
            >
              <Download className="h-4 w-4 mr-2" />
              Export AI Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiAuditResults.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                      <CardDescription>
                        {category.issues.length} issues found
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        category.status === 'excellent' ? 'text-green-600' :
                        category.status === 'good' ? 'text-emerald-600' :
                        category.status === 'fair' ? 'text-yellow-600' :
                        category.status === 'poor' ? 'text-orange-600' :
                        'text-red-600'
                      }`}>
                        {category.score}/{category.maxScore}
                      </div>
                      <Badge
                        variant={
                          category.status === 'excellent' ? 'default' :
                          category.status === 'good' ? 'secondary' :
                          category.status === 'fair' ? 'outline' :
                          category.status === 'poor' ? 'destructive' :
                          'destructive'
                        }
                        className="mt-1"
                      >
                        {category.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span>{category.score}%</span>
                      </div>
                      <Progress value={category.score} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Top Issues:</h4>
                      {category.issues.slice(0, 2).map((issue) => (
                        <div
                          key={issue.id}
                          className="flex items-start gap-2 p-2 rounded-md bg-gray-50 dark:bg-gray-800"
                        >
                          <div className={`mt-0.5 ${
                            issue.severity === 'critical' ? 'text-red-500' :
                            issue.severity === 'high' ? 'text-orange-500' :
                            issue.severity === 'medium' ? 'text-yellow-500' :
                            'text-blue-500'
                          }`}>
                            <AlertCircle className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{issue.title}</p>
                            <p className="text-xs text-gray-500">{issue.description}</p>
                          </div>
                        </div>
                      ))}
                      {category.issues.length > 2 && (
                        <p className="text-xs text-gray-500 text-center">
                          +{category.issues.length - 2} more issues
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setShowAIAuditDetails(
                      showAIAuditDetails === category.id ? null : category.id
                    )}
                  >
                    {showAIAuditDetails === category.id ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        View Details
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Expanded Details */}
              <AnimatePresence>
                {showAIAuditDetails === category.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2"
                  >
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          {/* Metrics */}
                          <div>
                            <h4 className="font-semibold mb-2">Metrics</h4>
                            <div className="grid grid-cols-2 gap-3">
                              {Object.entries(category.metrics).map(([key, value]) => (
                                <div key={key} className="space-y-1">
                                  <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </div>
                                  <div className="font-semibold">
                                    {typeof value === 'number' && value % 1 !== 0 
                                      ? value.toFixed(2) 
                                      : value}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* All Issues */}
                          <div>
                            <h4 className="font-semibold mb-2">All Issues</h4>
                            <div className="space-y-2">
                              {category.issues.map((issue) => (
                                <div
                                  key={issue.id}
                                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                          issue.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                                          issue.severity === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                                          issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                          'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                        }`}>
                                          {issue.severity}
                                        </span>
                                        <span className="text-sm font-medium">{issue.title}</span>
                                      </div>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {issue.description}
                                      </p>
                                      {issue.examples && issue.examples.length > 0 && (
                                        <div className="mt-2">
                                          <p className="text-xs font-medium text-gray-500">Examples:</p>
                                          <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc pl-4">
                                            {issue.examples.map((example, idx) => (
                                              <li key={idx}>{example}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                    <div className="text-right">
                                      <div className="text-sm font-semibold">{issue.impact}% impact</div>
                                    </div>
                                  </div>
                                  <div className="mt-3 pt-3 border-t">
                                    <p className="text-sm">
                                      <strong>Fix:</strong> {issue.fix}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Recommendations */}
                          <div>
                            <h4 className="font-semibold mb-2">Recommendations</h4>
                            <div className="space-y-3">
                              {category.recommendations.map((rec) => (
                                <div
                                  key={rec.id}
                                  className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
                                >
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h5 className="font-medium">{rec.title}</h5>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {rec.description}
                                      </p>
                                    </div>
                                    <Badge variant="outline" className="ml-2">
                                      Priority {rec.priority}
                                    </Badge>
                                  </div>
                                  <div className="mt-3 flex items-center justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">
                                      ⏱️ {rec.estimatedTime} hours
                                    </span>
                                    <span className="font-semibold">
                                      💰 ${rec.estimatedCost}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-500">
                            Last updated: {new Date(category.lastUpdated).toLocaleString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + N: Add new store
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        setShowAddStoreForm(true);
      }
      
      // Ctrl/Cmd + D: Delete selected store
      if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selectedStore) {
        e.preventDefault();
        setShowDeleteConfirm(selectedStore.id);
      }
      
      // Ctrl/Cmd + R: Run audit
      if ((e.ctrlKey || e.metaKey) && e.key === 'r' && selectedStore) {
        e.preventDefault();
        handleRunAIAudit(selectedStore.id);
      }
      
      // Escape: Close modals
      if (e.key === 'Escape') {
        if (showAddStoreForm) setShowAddStoreForm(false);
        if (showDeleteConfirm) setShowDeleteConfirm(null);
        if (importExportDialog) setImportExportDialog(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStore, showAddStoreForm, showDeleteConfirm, importExportDialog]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Floating Background Elements */}
     <div className="fixed inset-0 overflow-hidden pointer-events-none">
  <motion.div 
    className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full blur-3xl"
    animate={{
      x: [0, 30, 0],
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
  <motion.div 
    className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-green-500/10 to-cyan-600/10 rounded-full blur-3xl"
    animate={{
      x: [0, -25, 0],
      y: [0, 15, 0],
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1
    }}
  />
</div>


      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Ecommerce Audit</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive analysis & optimization</p>
                </div>
              </div>
            </div>

            {/* Bulk Actions and Store Management */}
            <div className="flex items-center space-x-4">
              {bulkActions.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="px-3 py-1">
                    {bulkActions.length} selected
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkAudit}
                    disabled={isAuditing}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Audit Selected
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleBulkDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setBulkActions([])}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setImportExportDialog('import')}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setImportExportDialog('export')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  onClick={() => setShowAddStoreForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Store
                </Button>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDarkMode(!darkMode)}
                    >
                      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* URL Input and Quick Actions */}
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex-1 max-w-2xl">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter store URL for audit..."
                  value={auditUrl}
                  onChange={(e) => setAuditUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={() => {
                    if (auditUrl) {
                      // Create a temporary store for URL audit
                      const tempStoreId = `temp-${Date.now()}`;
                      const tempStore: EcommerceStore = {
                        id: tempStoreId,
                        name: `Quick Audit: ${auditUrl.replace('https://', '').split('/')[0]}`,
                        url: auditUrl,
                        platform: 'custom',
                        status: 'auditing',
                        lastAudit: new Date(),
                        score: 0,
                        issues: 0,
                        warnings: 0,
                        revenue: 0,
                        traffic: 0,
                        conversionRate: 0,
                        products: 0,
                        orders: 0,
                      };
                      
                      setStores([...stores, tempStore]);
                      setSelectedStore(tempStore);
                      handleRunAIAudit(tempStoreId);
                    }
                  }}
                  disabled={isAuditing || !auditUrl}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  {isAuditing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Auditing...
                    </>
                  ) : (
                    <>
                      <Cpu className="h-4 w-4 mr-2" />
                      Run AI Audit
                    </>
                  )}
                </Button>
                <Select defaultValue="quick">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Scan Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quick">Quick Scan</SelectItem>
                    <SelectItem value="full">Full Audit</SelectItem>
                    <SelectItem value="ai">AI Deep Scan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleStartAudit}
                disabled={!selectedStore || isAuditing}
              >
                <Play className="h-4 w-4 mr-2" />
                Audit Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportReport}
                disabled={!selectedStore}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar with Store Statistics */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed lg:relative z-40 h-screen w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform`}
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Ecommerce Stores</h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setBulkActions(stores.map(s => s.id))}
                  className="h-8 w-8"
                >
                  <CheckSquare className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddStoreForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
            
            {/* Store Statistics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                <CardContent className="p-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{storeStatistics.totalStores}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total Stores</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                <CardContent className="p-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{storeStatistics.activeStores}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Active</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                <CardContent className="p-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{storeStatistics.averageScore.toFixed(1)}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Avg Score</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                <CardContent className="p-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{storeStatistics.totalIssues}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total Issues</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {stores.map(store => (
                  <motion.div
                    key={store.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      id={`store-card-${store.id}`}
                      className={`cursor-pointer transition-all ${selectedStore?.id === store.id ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''} ${bulkActions.includes(store.id) ? 'ring-2 ring-green-500' : ''}`}
                      onClick={() => {
                        if (bulkActions.length > 0) {
                          if (bulkActions.includes(store.id)) {
                            setBulkActions(bulkActions.filter(id => id !== store.id));
                          } else {
                            setBulkActions([...bulkActions, store.id]);
                          }
                        } else {
                          setSelectedStore(store);
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              {bulkActions.length > 0 && (
                                <div className={`mr-2 w-4 h-4 rounded border ${bulkActions.includes(store.id) ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                                  {bulkActions.includes(store.id) && (
                                    <Check className="h-3 w-3 text-white" />
                                  )}
                                </div>
                              )}
                              <div className={`p-2 rounded-lg ${
                                store.platform === 'shopify' ? 'bg-green-100 dark:bg-green-900/30' :
                                store.platform === 'woocommerce' ? 'bg-blue-100 dark:bg-blue-900/30' :
                                store.platform === 'magento' ? 'bg-orange-100 dark:bg-orange-900/30' :
                                'bg-gray-100 dark:bg-gray-900/30'
                              }`}>
                                <Store className="h-4 w-4" />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">{store.name}</h3>
                              <p className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[120px]">{store.url}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Badge
                              variant={
                                store.status === 'active' ? 'default' :
                                store.status === 'auditing' ? 'secondary' :
                                'destructive'
                              }
                              className="text-xs"
                            >
                              {store.status}
                            </Badge>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-48">
                                <div className="space-y-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start"
                                    onClick={() => handleEditStore(store)}
                                  >
                                    <Edit className="h-3 w-3 mr-2" />
                                    Edit Store
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start"
                                    onClick={() => handleRunAIAudit(store.id)}
                                  >
                                    <Cpu className="h-3 w-3 mr-2" />
                                    Run AI Audit
                                  </Button>
                                  <Separator />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start text-red-600 hover:text-red-700"
                                    onClick={() => setShowDeleteConfirm(store.id)}
                                  >
                                    <Trash2 className="h-3 w-3 mr-2" />
                                    Delete Store
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900 dark:text-white">{store.score}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Score</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-red-600 dark:text-red-400">{store.issues}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Issues</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{store.warnings}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Warnings</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600 dark:text-green-400">{store.conversionRate}%</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">CVR</div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <Progress value={store.score} className="h-1" />
                        </div>
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          Last audit: {new Date(store.lastAudit).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
            
            {stores.length === 0 && (
              <div className="text-center py-8">
                <Store className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No stores added yet</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => setShowAddStoreForm(true)}
                >
                  <Plus className="h-3 w-3 mr-2" />
                  Add First Store
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
  <span className="text-gray-600 dark:text-gray-400">Auto Audit</span>
  <Switch
    checked={autoAudit}
    onCheckedChange={setAutoAudit}
  />
</div>
<div className="flex items-center justify-between text-sm">
  <span className="text-gray-600 dark:text-gray-400">Notifications</span>
  <Switch
    checked={notificationEnabled}
    onCheckedChange={setNotificationEnabled}
  />
</div>
<div className="flex items-center justify-between text-sm">
  <span className="text-gray-600 dark:text-gray-400">Real-time Updates</span>
  <Switch
    checked={realTimeUpdates}
    onCheckedChange={setRealTimeUpdates}
  />
</div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {stores.length} stores • {storeStatistics.totalIssues} issues
              </p>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {selectedStore ? (
            <div className="space-y-6">
              {/* Store Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedStore.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="capitalize">
                      {selectedStore.platform}
                    </Badge>
                    <span className="text-gray-600 dark:text-gray-400">•</span>
                    <a
                      href={selectedStore.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
                    >
                      {selectedStore.url.replace('https://', '')}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditStore(selectedStore)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Store
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(selectedStore.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                  <Button
                    onClick={() => handleRunAIAudit(selectedStore.id)}
                    disabled={isAuditing}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Cpu className="h-4 w-4 mr-2" />
                    Run AI Audit
                  </Button>
                </div>
              </div>

              {/* Audit Progress Indicator */}
              {isAuditing && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
                          <span className="font-medium">Running AI Audit...</span>
                        </div>
                        <span className="text-sm text-gray-600">{auditProgress}%</span>
                      </div>
                      <Progress value={auditProgress} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Store: {selectedStore.name}</span>
                        <span>{scanQueue.length > 1 ? `${scanQueue.length} in queue` : ''}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Main Tabs */}
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="ai-audit">AI Audit</TabsTrigger>
                  <TabsTrigger value="issues">Issues</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  {/* Overview metrics grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {auditMetrics.map((metric) => (
      <Card key={metric.id}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
          <CardDescription>{metric.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{metric.value}{metric.unit}</div>
            <div className={`flex items-center ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
              {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : metric.trend === 'down' ? <TrendingDown className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
              <span className="text-sm ml-1">{metric.change > 0 ? '+' : ''}{metric.change}%</span>
            </div>
          </div>
          <Progress value={(metric.value / metric.target) * 100} className="mt-2" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Target: {metric.target}{metric.unit}</span>
            <span className={`${metric.status === 'good' ? 'text-green-600' : metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'}`}>
              {metric.status}
            </span>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
                  {/* Performance Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Performance Trends</CardTitle>
                        <CardDescription>Page load time over last 7 days</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 flex items-end gap-1">
                          {performanceData.map((data, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center">
                              <div 
                                className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                                style={{ height: `${(data.pageLoadTime / 4) * 100}%` }}
                              />
                              <div className="text-xs text-gray-500 mt-1">
                                {index === performanceData.length - 1 ? 'Now' : `-${performanceData.length - 1 - index}d`}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>SEO Performance</CardTitle>
                        <CardDescription>Keyword rankings and authority</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <BarChart3 className="h-4 w-4 mr-2 text-blue-500" />
                              <span>Domain Authority</span>
                            </div>
                            <span className="font-bold">{seoData.domainAuthority}/100</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                              <span>Backlinks</span>
                            </div>
                            <span className="font-bold">{seoData.backlinks.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-purple-500" />
                              <span>Indexed Pages</span>
                            </div>
                            <span className="font-bold">{seoData.indexedPages.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="ai-audit">
                  <AIAuditResults />
                </TabsContent>
                
                <TabsContent value="issues" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Audit Issues</h3>
                      <p className="text-sm text-gray-500">
                        {totalIssues} issues found • {criticalIssues} critical • {openIssues} open
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Search issues..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-48"
                      />
                      <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="performance">Performance</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="seo">SEO</SelectItem>
                          <SelectItem value="ux">UX</SelectItem>
                          <SelectItem value="conversion">Conversion</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Severities</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {filteredIssues.map((issue) => (
                      <Card key={issue.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={
                                    issue.severity === 'critical' ? 'destructive' :
                                    issue.severity === 'high' ? 'default' :
                                    issue.severity === 'medium' ? 'secondary' :
                                    'outline'
                                  }
                                >
                                  {issue.severity}
                                </Badge>
                                <Badge variant="outline">{issue.category}</Badge>
                                <span className="text-sm font-medium">{issue.title}</span>
                              </div>
                              <p className="text-sm text-gray-600">{issue.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>Impact: {issue.impact}%</span>
                                <span>Fix: {issue.estimatedTime}h (${issue.estimatedCost})</span>
                                <span>Priority: {issue.priority}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleResolveIssue(issue.id)}
                              >
                                Resolve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAssignIssue(issue.id, 'Current User')}
                              >
                                Assign
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="performance">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Scans</CardTitle>
                        <CardDescription>Latest security assessment results</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {securityScans.map((scan) => (
                            <div key={scan.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                {scan.status === 'passed' ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : scan.status === 'warning' ? (
                                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-red-500" />
                                )}
                                <div>
                                  <h4 className="font-medium">{scan.name}</h4>
                                  <p className="text-sm text-gray-500">{scan.details}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge
                                  variant={
                                    scan.status === 'passed' ? 'default' :
                                    scan.status === 'warning' ? 'secondary' :
                                    'destructive'
                                  }
                                >
                                  {scan.status}
                                </Badge>
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(scan.lastScan).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Conversion Metrics</CardTitle>
                        <CardDescription>Key conversion performance indicators</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <div className="text-2xl font-bold">{conversionData.rate}%</div>
                            <div className="text-sm text-gray-500">Conversion Rate</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-2xl font-bold">${conversionData.averageOrderValue}</div>
                            <div className="text-sm text-gray-500">Avg Order Value</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-2xl font-bold">{conversionData.cartAbandonmentRate}%</div>
                            <div className="text-sm text-gray-500">Cart Abandonment</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-2xl font-bold">${conversionData.customerLifetimeValue}</div>
                            <div className="text-sm text-gray-500">Customer LTV</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-2xl font-bold">{conversionData.bounceRate}%</div>
                            <div className="text-sm text-gray-500">Bounce Rate</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-2xl font-bold">{conversionData.exitRate}%</div>
                            <div className="text-sm text-gray-500">Exit Rate</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Store Settings</CardTitle>
                      <CardDescription>Configure audit preferences and notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Automated Audits</Label>
                            <p className="text-sm text-gray-500">Run regular audits automatically</p>
                          </div>
                          <Switch checked={autoAudit} onCheckedChange={setAutoAudit} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Real-time Monitoring</Label>
                            <p className="text-sm text-gray-500">Monitor store performance in real-time</p>
                          </div>
                          <Switch checked={realTimeUpdates} onCheckedChange={setRealTimeUpdates} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-gray-500">Receive alerts for critical issues</p>
                          </div>
                          <Switch checked={notificationEnabled} onCheckedChange={setNotificationEnabled} />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Audit Frequency</h4>
                        <Select defaultValue="weekly">
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="manual">Manual Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Danger Zone</h4>
                        <Alert variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Delete Store</AlertTitle>
                          <AlertDescription>
                            Permanently delete this store and all audit data.
                            <Button
                              variant="destructive"
                              size="sm"
                              className="mt-2"
                              onClick={() => setShowDeleteConfirm(selectedStore.id)}
                            >
                              Delete Store
                            </Button>
                          </AlertDescription>
                        </Alert>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <Store className="h-24 w-24 text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No Store Selected
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6 text-center max-w-md">
                Select a store from the sidebar or add a new one to start auditing
              </p>
              <Button
                onClick={() => setShowAddStoreForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Store
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddStoreFormModal />
      <DeleteConfirmationDialog />
      <ImportExportDialog />

      {/* Success Notification */}
      <div className="fixed top-4 right-4 z-50">
        <AnimatePresence>
          {isAuditing && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <AlertTitle>Audit in Progress</AlertTitle>
                <AlertDescription>
                  Scanning {selectedStore?.name}... {auditProgress}% complete
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EcommerceAudit;