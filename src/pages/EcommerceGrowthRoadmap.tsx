import React, { useState, useEffect } from 'react';
import { Tab as TabComponent } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Box,
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Chip,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Tooltip,
  CircularProgress,
  Switch,
  FormControlLabel,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Snackbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Badge,
  Drawer,
  ListItemButton,
  Toolbar,
  AppBar,
  AvatarGroup,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  ToggleButton,
  ToggleButtonGroup,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  InputAdornment,
  Collapse,
  Pagination,
  Skeleton,
  AlertTitle,
  useTheme
} from '@mui/material';
import {
  ExpandMore,
  CheckCircle,
  Warning,
  Error,
  Info,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Search,
  Image,
  LocalShipping,
  Star,
  Build,
  Lightbulb,
  Download,
  Refresh,
  BarChart,
  Timeline as TimelineIcon,
  AttachMoney,
  Tag,
  Category,
  Speed,
  ArrowForward,
  AddCircle,
  RemoveCircle,
  AutoGraph,
  Psychology,
  RocketLaunch,
  Insights,
  Dashboard,
  TableView,
  GridView,
  ChevronRight,
  Computer,
  Store,
  Public,
  Analytics,
  Cloud,
  PsychologyAlt,
  AutoFixHigh,
  Chat,
  CameraAlt,
  Checkroom,
  AccountTree,
  ExpandLess,
  OpenInNew,
  Save,
  Print,
  Notifications,
  Settings,
  Help,
  Close,
  ArrowBack,
  Done,
  Cancel,
  Edit,
  Delete,
  Add,
  CalendarToday,
  Mail,
  Person,
  VerifiedUser,
  Lock,
  Assessment,
  ShowChart,
  PieChart,
  ArrowUpward,
  ArrowDownward,
  Apps,
  Photo,
  Collections,
  MovieCreation,
  Business,
  Phone,
  LocationOn,
  Flag,
  Inventory2,
  SquareFoot,
  NetworkWifi,
  Widgets,
  Kitchen,
  Pool,
  EmojiEmotions,
  SportsSoccer,
  TravelExplore,
  FitnessCenter,
  Restaurant,
  Hotel,
  DirectionsCar,
  Flight,
  Train,
  ShoppingBag,
  Redeem,
  MonetizationOn,
  AccountBalance,
  Receipt,
  Payment,
  CreditCard,
  RemoveRedEye,
  ViewInAr,
  AutoAwesome,
  SmartToy,
  Memory,
  Storage,
  Terminal,
  DataObject,
  Factory,
  Construction,
  Handyman,
  Engineering,
  Architecture,
  DesignServices,
  Brush,
  Palette,
  Gradient,
  Timer,
  HourglassEmpty,
  HourglassFull,
  Schedule,
  Update,
  History,
  Replay,
  PlayCircleFilled,
  Stop,
  Headset,
  Camera,
  InsertPhoto,
  InsertChart,
  Functions,
  Calculate,
  CompareArrows,
  GppGood,
  GppBad,
  Security,
  Scale,
  TaskAlt,
  Assignment,
  Checklist,
  Ballot,
  QueryStats,
  Leaderboard,
  ScatterPlot,
  BubbleChart,
  Link as LinkIcon,
  Sync,
  CloudDone,
  Backup,
  Devices,
  Tv,
  Cast,
  Wifi,
  SignalCellular4Bar,
  Bluetooth,
  Gamepad,
  Keyboard,
  Mouse,
  Smartphone,
  Speaker,
  Watch,
  DirectionsBoat,
  DirectionsBus,
  DirectionsSubway,
  LocalTaxi,
  LocalBar,
  LocalCafe,
  LocalDining,
  LocalFlorist,
  LocalGasStation,
  LocalGroceryStore,
  LocalHospital,
  LocalLibrary,
  LocalMall,
  LocalMovies,
  LocalOffer,
  LocalParking,
  LocalPharmacy,
  LocalPizza,
  LocalPlay,
  LocalSee,
  Map,
  Navigation,
  Place,
  RestaurantMenu,
  Satellite,
  Terrain,
  Traffic,
  AddBusiness,
  Agriculture,
  Apartment,
  Bathtub,
  BeachAccess,
  BusinessCenter,
  CorporateFare,
  Cottage,
  Deck,
  Elevator,
  Escalator,
  FamilyRestroom,
  FireExtinguisher,
  FoodBank,
  Foundation,
  Grass,
  Home,
  House,
  MeetingRoom,
  NightShelter,
  OtherHouses,
  RoomService,
  SmokeFree,
  SmokingRooms,
  Spa,
  Stairs,
  Storefront,
  Stroller,
  Umbrella,
  Vaccines,
  WaterDamage,
  Bed,
  CoffeeMaker,
  DoorFront,
  Garage,
  Light,
  Microwave,
  OutdoorGrill,
  Shower,
  Yard,
  AllInclusive,
  BabyChangingStation,
  Backpack,
  Casino,
  ChargingStation,
  ChildCare,
  ChildFriendly,
  Dry,
  GolfCourse,
  HotTub,
  Iron,
  NoBackpack,
  NoCell,
  NoDrinks,
  NoFood,
  NoPhotography,
  RoomPreferences,
  Tapas,
  Villa,
  Article,
  AssignmentInd,
  AssignmentReturn,
  AssignmentReturned,
  AssuredWorkload,
  BackupTable,
  Book,
  BookmarkAdd,
  Bookmarks,
  BugReport,
  CalendarMonth,
  CancelScheduleSend,
  ChangeHistory,
  ChromeReaderMode,
  CircleNotifications,
  Class,
  CloseFullscreen,
  Code,
  Commute,
  Compress,
  ContactPage,
  ContactSupport,
  Contactless,
  Copyright,
  CreditCardOff,
  CreditScore,
  Dangerous,
  DataExploration,
  DateRange,
  DeleteForever,
  DeleteOutline,
  Description,
  DisabledByDefault,
  Discount,
  DisplaySettings,
  Dns,
  DoneAll,
  DragIndicator,
  DynamicForm,
  EditCalendar,
  Eject,
  EuroSymbol,
  Event,
  EventNote,
  ExitToApp,
  Extension,
  Face,
  FactCheck,
  Favorite,
  Feedback,
  FilePresent,
  FilterAlt,
  FindInPage,
  FindReplace,
  Fingerprint,
  FitScreen,
  FlightLand,
  FlightTakeoff,
  FlipToBack,
  FlipToFront,
  FreeCancellation,
  Gavel,
  GetApp,
  Grade,
  Grading,
  GroupWork,
  HelpCenter,
  HighlightAlt,
  HomeWork,
  HorizontalSplit,
  HotelClass,
  Https,
  ImportantDevices,
  Input,
  InstallDesktop,
  InstallMobile,
  Javascript,
  Label,
  LabelImportant,
  Language,
  Launch,
  LineStyle,
  Login,
  Logout,
  Loyalty,
  ManageAccounts,
  MarkAsUnread,
  Maximize,
  Mediation,
  Minimize,
  ModelTraining,
  NextPlan,
  NoAccounts,
  NoteAdd,
  OfflineBolt,
  OfflinePin,
  OnlinePrediction,
  OpenInBrowser,
  OpenInFull,
  Outbound,
  Outlet,
  Pageview,
  Paid,
  PanTool,
  Pending,
  Percent,
  PermCameraMic,
  PermContactCalendar,
  PermDeviceInformation,
  PermIdentity,
  PermMedia,
  PermPhoneMsg,
  Pets,
  PictureInPicture,
  Pinch,
  PlayForWork,
  PowerSettingsNew,
  Preview,
  PrivacyTip,
  PrivateConnectivity,
  ProductionQuantityLimits,
  PublishedWithChanges,
  QueryBuilder,
  QuestionAnswer,
  Quickreply,
  RecordVoiceOver,
  RemoveDone,
  RemoveShoppingCart,
  Reorder,
  ReportProblem,
  RequestPage,
  RequestQuote,
  RestartAlt,
  RestoreFromTrash,
  RestorePage,
  Rocket,
  Room,
  RoundedCorner,
  Rowing,
  Rule,
  RuleFolder,
  RunningWithErrors,
  SavedSearch,
  Savings,
  ScheduleSend,
  SearchOff,
  Segment,
  SendAndArchive,
  Sensors,
  SettingsApplications,
  SettingsBackupRestore,
  SettingsCell,
  Share,
  Shop,
  Shop2,
  SmartButton,
  Source,
  SpaceDashboard,
  SpeakerNotes,
  Spellcheck,
  StarHalf,
  Stars,
  StickyNote2,
  Subject,
  SupervisorAccount,
  Support,
  SupportAgent,
  SwapHoriz,
  SwapVert,
  Swipe,
  SwitchAccessShortcut,
  SystemUpdateAlt,
  TextRotateUp,
  ThumbsUpDown,
  TipsAndUpdates,
  Toc,
  Token,
  Toll,
  TouchApp,
  Tour,
  TrackChanges,
  Translate,
  TurnedIn,
  Unpublished,
  Upgrade,
  Verified,
  VerticalSplit,
  ViewAgenda,
  ViewArray,
  ViewCarousel,
  ViewColumn,
  ViewComfy,
  ViewCompact,
  ViewDay,
  ViewHeadline,
  ViewList,
  ViewModule,
  ViewQuilt,
  ViewSidebar,
  ViewStream,
  ViewWeek,
  Visibility,
  VoiceOverOff,
  Webhook,
  Work,
  WorkHistory,
  WorkOff,
  WorkOutline,
  Wysiwyg,
  ZoomIn,
  ZoomOut,
  AddAlert,
  AutoDelete,
  NotificationImportant,
  AddTask,
  DownloadDone,
  DownloadForOffline,
  DriveFileMove,
  Folder,
  FolderOpen,
  FolderShared,
  SnippetFolder,
  TextSnippet,
  Topic,
  UploadFile,
  Workspaces,
  Approval,
  AttachEmail,
  Attachment,
  CreateNewFolder,
  Downloading,
  FileDownload,
  FileUpload,
  Upload,
  AddComment,
  AlignHorizontalCenter,
  AltRoute,
  Anchor,
  ArrowCircleDown,
  ArrowCircleLeft,
  ArrowCircleRight,
  ArrowCircleUp,
  AspectRatio,
  Autorenew,
  BatchPrediction,
  Bookmark,
  BookmarkBorder,
  BookmarkRemove,
  BuildCircle,
  CalendarViewDay,
  CalendarViewMonth,
  CalendarViewWeek,
  CameraEnhance,
  CardGiftcard,
  CheckCircleOutline,
  CodeOff,
  CommentBank,
  DensityLarge,
  DensityMedium,
  DensitySmall,
  DeleteSweep,
  DonutLarge,
  DonutSmall,
  EditOff,
  EventRepeat,
  ExpandCircleDown,
  ExtensionOff,
  FaceRetouchingNatural,
  FavoriteBorder,
  Fax,
  Flaky,
  FlutterDash,
  GTranslate,
  GeneratingTokens,
  Gif,
  GifBox,
  HideSource,
  HistoryToggleOff,
  JoinFull,
  JoinInner,
  JoinLeft,
  JoinRight,
  LockClock,
  LockOpen,
  LockPerson,
  LockReset,
  MarkunreadMailbox,
  NightlightRound,
  NoiseAware,
  NoiseControlOff,
  NotAccessible,
  NotStarted,
  Opacity,
  OpenWith,
  Outbox,
  Output,
  PanToolAlt,
  PermDataSetting,
  PermScanWifi,
  Phishing,
  PictureInPictureAlt,
  PinEnd,
  PinInvoke,
  PregnantWoman,
  RecordVoiceOver as RecordVoiceOverIcon,
  Room as RoomIcon,
  RoundedCorner as RoundedCornerIcon,
  Rowing as RowingIcon,
  Rule as RuleIcon,
  RuleFolder as RuleFolderIcon,
  RunningWithErrors as RunningWithErrorsIcon,
  SavedSearch as SavedSearchIcon,
  Savings as SavingsIcon,
  ScheduleSend as ScheduleSendIcon,
  Search as SearchIcon,
  SearchOff as SearchOffIcon,
  Segment as SegmentIcon,
  SendAndArchive as SendAndArchiveIcon,
  Sensors as SensorsIcon,
  Source as SourceIcon,
  SpaceDashboard as SpaceDashboardIcon,
  SpeakerNotes as SpeakerNotesIcon,
  Star as StarIcon,
  SwapHorizontalCircle,
  SwapVerticalCircle,
  SyncAlt,
  Task,
  TextRotateVertical,
  TextRotationAngledown,
  TextRotationAngleup,
  TextRotationDown,
  TextRotationNone,
  Today,
  TrendingFlat,
  TurnedInNot,
  VerticalSplit as VerticalSplitIcon,
  ViewCozy,
  VisibilityOff,
  WatchLater,
  WifiProtectedSetup,
  YoutubeSearchedFor,
  ErrorOutline,
  ChecklistRtl,
  Download as DownloadIcon,
  DriveFileRenameOutline,
  DriveFolderUpload,
  FileDownloadDone,
  FileDownloadOff,
  FolderZip,
  PictureAsPdf, // Added missing import
  Expand, // Added missing import
  Coffee // Added missing import (fixed conflict)
} from '@mui/icons-material';

import { Line, Bar, Pie, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
} from 'chart.js';

// Lightweight local fallbacks for Timeline components (use @mui/lab if available)
const Timeline: React.FC<any> = ({ children, position }) => (
  <div className={`local-timeline ${position || ''}`}>{children}</div>
);
const TimelineItem: React.FC<any> = ({ children }) => (
  <div className="local-timeline-item">{children}</div>
);
const TimelineSeparator: React.FC<any> = ({ children }) => (
  <div className="local-timeline-separator">{children}</div>
);
const TimelineConnector: React.FC<any> = () => (
  <div className="local-timeline-connector" />
);
const TimelineContent: React.FC<any> = ({ children }) => (
  <div className="local-timeline-content">{children}</div>
);
const TimelineDot: React.FC<any> = ({ children, color }) => (
  <span className={`local-timeline-dot ${color || ''}`}>{children}</span>
);
const TimelineOppositeContent: React.FC<any> = ({ children, ...props }) => (
  <div className="local-timeline-opposite" {...props}>{children}</div>
);

// Grid wrapper component to handle 'item' and legacy props
const GridWrapper: React.FC<any> = ({ item, xs, sm, md, lg, children, ...rest }) => {
  if (item) {
    // Map legacy item + xs/sm/md/lg props to Grid props
    const mapped: any = { ...rest };
    if (xs !== undefined) mapped.xs = xs;
    if (sm !== undefined) mapped.sm = sm;
    if (md !== undefined) mapped.md = md;
    if (lg !== undefined) mapped.lg = lg;
    return <Grid {...mapped}>{children}</Grid>;
  }
  return <Grid {...rest}>{children}</Grid>;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
);

// ==================== TYPES & INTERFACES ====================
interface BusinessHealthMetrics {
  traffic: number;
  ctr: number;
  cvr: number;
  aov: number;
  returnRate: number;
  cac: number;
  ltv: number;
  productDiscoveryEfficiency: number;
  catalogCompleteness: number;
  pricingCompetitiveness: number;
}

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high' | 'very-high';
  impact: number;
  timeline: { startWeek: number; endWeek: number; durationWeeks: number };
  owner: string;
  dependencies: string[];
  kpis: Array<{ name: string; target: number; current: number; unit: string }>;
  status: 'planned' | 'in-progress' | 'completed' | 'delayed';
  confidence: number;
  estimatedROI: number;
  resources: Array<{ type: 'people' | 'budget' | 'tools'; amount: number; unit: string }>;
}

interface AIProjection {
  initiative: string;
  baseline: number;
  projection30d: number;
  projection90d: number;
  projection180d: number;
  projection365d: number;
  confidence: number;
}

interface CompetitorAnalysis {
  name: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  gaps: string[];
}

interface RiskItem {
  id: string;
  title: string;
  category: 'demand' | 'market' | 'inventory' | 'cac' | 'discounts';
  severity: 'high' | 'medium' | 'low';
  probability: number;
  impact: number;
  mitigation: string[];
  timeline: string;
}

// ==================== MAIN COMPONENT ====================
const EcommerceGrowthRoadmap: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [businessHealth, setBusinessHealth] = useState<BusinessHealthMetrics>({
    traffic: 50000,
    ctr: 2.8,
    cvr: 3.2,
    aov: 85,
    returnRate: 8.5,
    cac: 45,
    ltv: 285,
    productDiscoveryEfficiency: 68,
    catalogCompleteness: 72,
    pricingCompetitiveness: 65
  });

  const [timeframe, setTimeframe] = useState<'30' | '60' | '90' | '180' | '365'>('90');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [roadmapView, setRoadmapView] = useState<'timeline' | 'matrix' | 'list'>('timeline');
  const [generating, setGenerating] = useState(false);
  const [exportDialog, setExportDialog] = useState(false);

  const teams = ['Tech', 'Catalog', 'SEO/Content', 'Marketing', 'Operations', 'Customer Service'];

  // ==================== FEATURE 1: BUSINESS HEALTH ANALYZER ====================
  const renderBusinessHealthAnalyzer = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="📊 1. Business Health Baseline Analyzer"
        subheader="AI scans your current performance across 10 key metrics"
        action={
          <Chip 
            icon={<Analytics />} 
            label={`Health Score: ${calculateHealthScore()}%`}
            color={calculateHealthScore() > 80 ? 'success' : calculateHealthScore() > 60 ? 'warning' : 'error'}
            variant="outlined"
          />
        }
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <GridWrapper container spacing={3}>
          <GridWrapper item xs={12}>
            <Typography variant="h6" gutterBottom color="primary">
              📈 Key Performance Indicators
            </Typography>
            <GridWrapper container spacing={2}>
              {[
                { label: 'Monthly Traffic', value: businessHealth.traffic, unit: 'visitors', target: 75000, icon: <Public />, color: 'primary' },
                { label: 'CTR', value: businessHealth.ctr, unit: '%', target: 3.5, icon: <TrendingUp />, color: 'info' },
                { label: 'Conversion Rate', value: businessHealth.cvr, unit: '%', target: 4.0, icon: <ShoppingCart />, color: 'success' },
                { label: 'Average Order Value', value: businessHealth.aov, unit: '$', target: 100, icon: <AttachMoney />, color: 'warning' },
                { label: 'Return Rate', value: businessHealth.returnRate, unit: '%', target: 5.0, icon: <Refresh />, color: 'error' },
                { label: 'Customer Acquisition Cost', value: businessHealth.cac, unit: '$', target: 35, icon: <Person />, color: 'secondary' },
                { label: 'Lifetime Value', value: businessHealth.ltv, unit: '$', target: 350, icon: <Star />, color: 'success' },
                { label: 'Discovery Efficiency', value: businessHealth.productDiscoveryEfficiency, unit: '%', target: 85, icon: <Search />, color: 'info' },
                { label: 'Catalog Completeness', value: businessHealth.catalogCompleteness, unit: '%', target: 90, icon: <Category />, color: 'primary' },
                { label: 'Pricing Competitiveness', value: businessHealth.pricingCompetitiveness, unit: '%', target: 80, icon: <Tag />, color: 'warning' },
              ].map((metric, index) => (
                <GridWrapper item xs={12} sm={6} md={4} lg={2.4} key={index}>
                  <Paper sx={{ 
                    p: 2, 
                    height: '100%',
                    bgcolor: 'background.default',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Box sx={{ color: `${metric.color}.main` }}>{metric.icon}</Box>
                      <Typography variant="subtitle2" color="text.primary">{metric.label}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 1 }}>
                      <Typography variant="h5" color="text.primary">{metric.value}</Typography>
                      <Typography variant="body2" color="text.secondary">{metric.unit}</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(metric.value / metric.target) * 100}
                      color={metric.value >= metric.target ? 'success' : 'error'}
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Target: {metric.target}{metric.unit}
                    </Typography>
                  </Paper>
                </GridWrapper>
              ))}
            </GridWrapper>
          </GridWrapper>

          <GridWrapper item xs={12}>
            <Typography variant="h6" gutterBottom color="primary">
              🎯 Diagnostic Health Report
            </Typography>
            <GridWrapper container spacing={2}>
              <GridWrapper item xs={12} md={6}>
                <Paper sx={{ p: 2, bgcolor: 'success.dark', color: 'white' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    ✅ Strengths & Opportunities
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="inherit" /></ListItemIcon>
                      <ListItemText 
                        primary="Strong Lifetime Value (LTV:CAC = 6.3:1)" 
                        secondary="Excellent customer profitability" 
                        primaryTypographyProps={{ color: 'inherit' }}
                        secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="inherit" /></ListItemIcon>
                      <ListItemText 
                        primary="Good Catalog Structure" 
                        secondary="72% completeness score with clear hierarchy" 
                        primaryTypographyProps={{ color: 'inherit' }}
                        secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Lightbulb color="inherit" /></ListItemIcon>
                      <ListItemText 
                        primary="Quick Win: Optimize Product Images" 
                        secondary="Expected +15% conversion lift" 
                        primaryTypographyProps={{ color: 'inherit' }}
                        secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </GridWrapper>
              <GridWrapper item xs={12} md={6}>
                <Paper sx={{ p: 2, bgcolor: 'error.dark', color: 'white' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    ⚠️ Critical Issues Requiring Attention
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><Error color="inherit" /></ListItemIcon>
                      <ListItemText 
                        primary="High Return Rate (8.5%)" 
                        secondary="70% above target - sizing/fit issues detected" 
                        primaryTypographyProps={{ color: 'inherit' }}
                        secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Error color="inherit" /></ListItemIcon>
                      <ListItemText 
                        primary="Low Conversion Rate (3.2%)" 
                        secondary="20% below industry average - checkout friction detected" 
                        primaryTypographyProps={{ color: 'inherit' }}
                        secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Warning color="inherit" /></ListItemIcon>
                      <ListItemText 
                        primary="Rising CAC Trend" 
                        secondary="Increased 15% last quarter - attribution gaps detected" 
                        primaryTypographyProps={{ color: 'inherit' }}
                        secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </GridWrapper>
            </GridWrapper>
          </GridWrapper>
        </GridWrapper>
      </CardContent>
    </Card>
  );

  // ==================== FEATURE 2: CATALOG QUALITY ROADMAP ====================
  const renderCatalogRoadmap = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="🛍️ 2. Catalog Quality & Completeness Roadmap"
        subheader="30/60/90 day catalog enhancement checklist"
        action={
          <ToggleButtonGroup
            value={timeframe}
            exclusive
            onChange={(e, value) => value && setTimeframe(value)}
            size="small"
            sx={{ bgcolor: 'background.default' }}
          >
            <ToggleButton value="30">30d</ToggleButton>
            <ToggleButton value="60">60d</ToggleButton>
            <ToggleButton value="90">90d</ToggleButton>
          </ToggleButtonGroup>
        }
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <Stepper orientation="vertical" sx={{ bgcolor: 'transparent' }}>
          <Step active={true}>
            <StepLabel StepIconComponent={() => (
              <Avatar sx={{ bgcolor: 'error.main', color: 'white' }}>1</Avatar>
            )}>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                  Phase 1: Critical Fixes (Weeks 1-4)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fix foundational issues affecting 80% of traffic
                </Typography>
              </Box>
            </StepLabel>
            <StepContent>
              <GridWrapper container spacing={2}>
                <GridWrapper item xs={12} md={6}>
                  <Paper sx={{ p: 2, bgcolor: 'error.dark', color: 'white' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      🚨 Priority 1: Missing Attributes
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><CheckCircle color="inherit" /></ListItemIcon>
                        <ListItemText 
                          primary="Fix missing attributes for top 100 SKUs" 
                          secondary="Impact: +15% discovery" 
                          primaryTypographyProps={{ color: 'inherit' }}
                          secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircle color="inherit" /></ListItemIcon>
                        <ListItemText 
                          primary="Standardize size/fit attributes" 
                          secondary="Impact: -20% returns" 
                          primaryTypographyProps={{ color: 'inherit' }}
                          secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircle color="inherit" /></ListItemIcon>
                        <ListItemText 
                          primary="Add missing product dimensions" 
                          secondary="Impact: Better filtering" 
                          primaryTypographyProps={{ color: 'inherit' }}
                          secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                        />
                      </ListItem>
                    </List>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Chip label="Effort: Low" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                      <Chip label="Impact: High" size="small" color="success" />
                      <Chip label="ROI: 25%" size="small" color="success" />
                    </Box>
                  </Paper>
                </GridWrapper>
                <GridWrapper item xs={12} md={6}>
                  <Paper sx={{ p: 2, bgcolor: 'warning.dark', color: 'white' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      📸 Image Quality Improvements
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><CheckCircle color="inherit" /></ListItemIcon>
                        <ListItemText 
                          primary="Add 360° views for premium products" 
                          secondary="Impact: +12% conversion" 
                          primaryTypographyProps={{ color: 'inherit' }}
                          secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircle color="inherit" /></ListItemIcon>
                        <ListItemText 
                          primary="Standardize image sizes (2000x2000px)" 
                          secondary="Impact: Faster load times" 
                          primaryTypographyProps={{ color: 'inherit' }}
                          secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircle color="inherit" /></ListItemIcon>
                        <ListItemText 
                          primary="Add lifestyle context images" 
                          secondary="Impact: +8% AOV" 
                          primaryTypographyProps={{ color: 'inherit' }}
                          secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </GridWrapper>
              </GridWrapper>
            </StepContent>
          </Step>

          <Step active={true}>
            <StepLabel StepIconComponent={() => (
              <Avatar sx={{ bgcolor: 'warning.main', color: 'white' }}>2</Avatar>
            )}>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                  Phase 2: Quality Enhancement (Weeks 5-8)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add advanced content and features
                </Typography>
              </Box>
            </StepLabel>
            <StepContent>
              <GridWrapper container spacing={2}>
                <GridWrapper item xs={12} md={6}>
                  <Paper sx={{ p: 2, bgcolor: 'info.dark', color: 'white' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      🎥 Rich Media Content
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><CheckCircle color="inherit" /></ListItemIcon>
                        <ListItemText 
                          primary="Add video demonstrations for complex products" 
                          secondary="Impact: +25% engagement" 
                          primaryTypographyProps={{ color: 'inherit' }}
                          secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircle color="inherit" /></ListItemIcon>
                        <ListItemText 
                          primary="Implement size/fit recommendation videos" 
                          secondary="Impact: -15% returns" 
                          primaryTypographyProps={{ color: 'inherit' }}
                          secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </GridWrapper>
                <GridWrapper item xs={12} md={6}>
                  <Paper sx={{ p: 2, bgcolor: 'success.dark', color: 'white' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      🤖 AI Content Enhancement
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon><CheckCircle color="inherit" /></ListItemIcon>
                        <ListItemText 
                          primary="Enhance product descriptions with AI" 
                          secondary="Impact: +18% SEO traffic" 
                          primaryTypographyProps={{ color: 'inherit' }}
                          secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircle color="inherit" /></ListItemIcon>
                        <ListItemText 
                          primary="Implement product tagging automation" 
                          secondary="Impact: 90% time savings" 
                          primaryTypographyProps={{ color: 'inherit' }}
                          secondaryTypographyProps={{ color: 'rgba(255,255,255,0.7)' }}
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </GridWrapper>
              </GridWrapper>
            </StepContent>
          </Step>
        </Stepper>

        {/* KPI Tracking */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom color="primary">
            📊 Catalog Improvement KPIs
          </Typography>
          <TableContainer component={Paper} sx={{ bgcolor: 'background.default' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'action.hover' }}>
                  <TableCell sx={{ color: 'text.primary', fontWeight: 'bold' }}>KPI</TableCell>
                  <TableCell align="center" sx={{ color: 'text.primary', fontWeight: 'bold' }}>Current</TableCell>
                  <TableCell align="center" sx={{ color: 'text.primary', fontWeight: 'bold' }}>Target</TableCell>
                  <TableCell align="center" sx={{ color: 'text.primary', fontWeight: 'bold' }}>30d Goal</TableCell>
                  <TableCell align="center" sx={{ color: 'text.primary', fontWeight: 'bold' }}>90d Goal</TableCell>
                  <TableCell align="center" sx={{ color: 'text.primary', fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { kpi: 'Attribute Completeness', current: 68, target: 95, goal30d: 80, goal90d: 90, unit: '%' },
                  { kpi: 'Image Quality Score', current: 72, target: 90, goal30d: 80, goal90d: 85, unit: '%' },
                  { kpi: 'Video Coverage', current: 15, target: 60, goal30d: 30, goal90d: 50, unit: '%' },
                  { kpi: 'Search Match Rate', current: 78, target: 95, goal30d: 85, goal90d: 90, unit: '%' },
                  { kpi: 'Mobile Image Optimization', current: 65, target: 95, goal30d: 80, goal90d: 90, unit: '%' },
                ].map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ color: 'text.primary' }}>{row.kpi}</TableCell>
                    <TableCell align="center" sx={{ color: 'text.primary' }}>{row.current}{row.unit}</TableCell>
                    <TableCell align="center" sx={{ color: 'text.primary' }}>{row.target}{row.unit}</TableCell>
                    <TableCell align="center" sx={{ color: 'text.primary' }}>{row.goal30d}{row.unit}</TableCell>
                    <TableCell align="center" sx={{ color: 'text.primary' }}>{row.goal90d}{row.unit}</TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={row.current >= row.target ? 'On Track' : 'Needs Work'} 
                        color={row.current >= row.target ? 'success' : 'warning'} 
                        size="small" 
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </Card>
  );

  // ==================== FEATURE 4: AI PERSONALIZATION ROADMAP ====================
  const renderAIPersonalizationRoadmap = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="🧠 4. AI & Personalization Adoption Roadmap"
        subheader="L1 → L5 maturity model with impact projections"
        action={
          <Chip 
            icon={<Psychology />} 
            label="Current: L2 | Target: L5" 
            color="info" 
            variant="outlined"
          />
        }
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <GridWrapper container spacing={3}>
          <GridWrapper item xs={12}>
            <Typography variant="h6" gutterBottom color="primary">
              📈 AI Maturity Model Progression
            </Typography>
            <Timeline position="alternate">
              {[
                {
                  level: 'L1',
                  title: 'Basic',
                  features: ['Segmented email', 'Basic recommendations'],
                  impact: '5-8% revenue lift',
                  timeline: 'Current'
                },
                {
                  level: 'L2',
                  title: 'Advanced',
                  features: ['Personalized homepage', 'Behavioral targeting'],
                  impact: '12-18% revenue lift',
                  timeline: '30 days'
                },
                {
                  level: 'L3',
                  title: 'Intelligent',
                  features: ['Visual search', 'Predictive search'],
                  impact: '22-28% revenue lift',
                  timeline: '90 days'
                },
                {
                  level: 'L4',
                  title: 'Predictive',
                  features: ['AI chatbot', 'Dynamic pricing'],
                  impact: '35-42% revenue lift',
                  timeline: '180 days'
                },
                {
                  level: 'L5',
                  title: 'Autonomous',
                  features: ['Full personalization', 'Autonomous optimization'],
                  impact: '50-65% revenue lift',
                  timeline: '365 days'
                }
              ].map((stage, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent color="text.secondary">
                    {stage.timeline}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color={index <= 1 ? 'success' : index === 2 ? 'warning' : 'info'}>
                      {stage.level}
                    </TimelineDot>
                    {index < 4 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper sx={{ 
                      p: 2,
                      bgcolor: index <= 1 ? 'success.dark' : index === 2 ? 'warning.dark' : 'info.dark',
                      color: 'white'
                    }}>
                      <Typography variant="subtitle1">{stage.title} Personalization</Typography>
                      <List dense>
                        {stage.features.map((feature, idx) => (
                          <ListItem key={idx} sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
                              <ChevronRight fontSize="small" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={feature} 
                              primaryTypographyProps={{ color: 'inherit' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      <Chip label={stage.impact} size="small" color="success" sx={{ mt: 1 }} />
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </GridWrapper>
        </GridWrapper>
      </CardContent>
    </Card>
  );

  // ==================== FEATURE 13: AI IMPACT PROJECTION ENGINE ====================
  const renderAIImpactProjection = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="🚀 13. AI Impact Projection Engine"
        subheader="Predicts revenue uplift from AI recommendations with 85% confidence"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <GridWrapper container spacing={3}>
          <GridWrapper item xs={12}>
            <Typography variant="h6" gutterBottom color="primary">
              📈 Cumulative Impact Projection
            </Typography>
            <Box sx={{ height: 400, bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
              <Line
                data={{
                  labels: ['Baseline', '30 Days', '90 Days', '180 Days', '365 Days'],
                  datasets: [
                    {
                      label: 'Catalog Optimization',
                      data: [0, 8, 15, 22, 28],
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      fill: true
                    },
                    {
                      label: 'Search Improvements',
                      data: [0, 5, 12, 20, 30],
                      borderColor: 'rgb(54, 162, 235)',
                      backgroundColor: 'rgba(54, 162, 235, 0.2)',
                      fill: true
                    },
                    {
                      label: 'Personalization Engine',
                      data: [0, 3, 10, 22, 38],
                      borderColor: 'rgb(75, 192, 192)',
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      fill: true
                    },
                    {
                      label: 'Dynamic Pricing',
                      data: [0, 6, 14, 25, 35],
                      borderColor: 'rgb(153, 102, 255)',
                      backgroundColor: 'rgba(153, 102, 255, 0.2)',
                      fill: true
                    },
                    {
                      label: 'Total Revenue Impact',
                      data: [0, 22, 51, 89, 131],
                      borderColor: 'rgb(255, 159, 64)',
                      backgroundColor: 'rgba(255, 159, 64, 0.2)',
                      borderWidth: 3,
                      fill: true
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: { color: theme.palette.text.primary }
                    },
                    title: {
                      display: true,
                      text: 'Cumulative Revenue Impact Projection (%)',
                      color: theme.palette.text.primary
                    }
                  },
                  scales: {
                    x: {
                      grid: { color: 'rgba(255,255,255,0.1)' },
                      ticks: { color: theme.palette.text.secondary }
                    },
                    y: {
                      grid: { color: 'rgba(255,255,255,0.1)' },
                      ticks: { color: theme.palette.text.secondary }
                    }
                  }
                }}
              />
            </Box>
          </GridWrapper>
        </GridWrapper>
      </CardContent>
    </Card>
  );

  // ==================== FEATURE 12: AUTO-GENERATED TIMELINE ROADMAP ====================
  const renderTimelineRoadmap = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="📅 12. Auto-Generated 30/60/90/180/365-Day Roadmap"
        subheader="Weekly and monthly tasks with expected ROI and confidence scores"
        action={
          <FormControl size="small" sx={{ width: 120, bgcolor: 'background.default' }}>
            <Select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value as any)}
              sx={{ color: 'text.primary' }}
            >
              <MenuItem value="30">30 Days</MenuItem>
              <MenuItem value="60">60 Days</MenuItem>
              <MenuItem value="90">90 Days</MenuItem>
              <MenuItem value="180">180 Days</MenuItem>
              <MenuItem value="365">365 Days</MenuItem>
            </Select>
          </FormControl>
        }
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <Timeline position="alternate">
          {[
            {
              period: 'Week 1-4',
              title: '🚀 Quick Wins Phase',
              description: 'Implement high-impact, low-effort improvements',
              tasks: ['Fix checkout bugs', 'Add trust badges', 'Optimize product images'],
              roi: '15%',
              confidence: 85,
              color: 'error'
            },
            {
              period: 'Week 5-12',
              title: '🛠️ Foundation Building',
              description: 'Implement core features and infrastructure',
              tasks: ['Catalog standardization', 'Search optimization', 'Basic personalization'],
              roi: '28%',
              confidence: 75,
              color: 'warning'
            },
            {
              period: 'Month 4-6',
              title: '📈 Growth Acceleration',
              description: 'Scale successful features and expand capabilities',
              tasks: ['Advanced personalization', 'AI recommendations', 'Market expansion'],
              roi: '42%',
              confidence: 68,
              color: 'info'
            },
            {
              period: 'Month 7-12',
              title: '🏆 Market Leadership',
              description: 'Advanced AI features and optimization',
              tasks: ['Autonomous optimization', 'Predictive analytics', 'Full ecosystem integration'],
              roi: '65%',
              confidence: 60,
              color: 'success'
            }
          ].map((phase, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent color="text.secondary">
                {phase.period}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={phase.color as any}>
                  {index === 0 && <RocketLaunch />}
                  {index === 1 && <Build />}
                  {index === 2 && <TrendingUp />}
                  {index === 3 && <AutoGraph />}
                </TimelineDot>
                {index < 3 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Paper sx={{ 
                  p: 2, 
                  bgcolor: `${phase.color}.dark`,
                  color: 'white'
                }}>
                  <Typography variant="h6">{phase.title}</Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.7)' }}>
                    {phase.description}
                  </Typography>
                  
                  <List dense>
                    {phase.tasks.map((task, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
                          <CheckCircle fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={task} 
                          primaryTypographyProps={{ color: 'inherit' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Chip label={`Expected ROI: ${phase.roi}`} size="small" color="success" />
                    <Chip label={`Confidence: ${phase.confidence}%`} size="small" color="info" />
                    <Chip label={`Duration: ${phase.period}`} size="small" variant="outlined" />
                  </Box>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );

  // ==================== ADDITIONAL FEATURES ====================

  // Feature 3: Search & Discovery Optimization
  const renderSearchDiscoveryRoadmap = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="🔍 3. Search & Discovery Optimization Plan"
        subheader="Search improvement sprint cycles with AI-powered recommendations"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Coming Soon: Advanced Search Analytics
        </Typography>
        <Typography color="text.secondary">
          This feature will include:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon><Search color="primary" /></ListItemIcon>
            <ListItemText primary="Search term analysis" secondary="Identify top performing and underperforming searches" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Analytics color="primary" /></ListItemIcon>
            <ListItemText primary="Zero-result optimization" secondary="Reduce search abandonment by 40%" />
          </ListItem>
          <ListItem>
            <ListItemIcon><AutoGraph color="primary" /></ListItemIcon>
            <ListItemText primary="AI-powered search suggestions" secondary="Increase search-to-cart conversion by 25%" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );

  // Feature 5: Pricing & Revenue Optimization
  const renderPricingRevenueRoadmap = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="💰 5. Pricing & Revenue Optimization Roadmap"
        subheader="Dynamic pricing strategies and revenue maximization"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Revenue Optimization Strategies
        </Typography>
        <GridWrapper container spacing={2}>
          <GridWrapper item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: 'primary.dark', color: 'white' }}>
              <Typography variant="subtitle2" gutterBottom>
                📊 Price Elasticity Analysis
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Identify optimal price points for maximum profitability
              </Typography>
            </Paper>
          </GridWrapper>
          <GridWrapper item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: 'secondary.dark', color: 'white' }}>
              <Typography variant="subtitle2" gutterBottom>
                🎯 Competitive Pricing
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Real-time competitor price monitoring and adjustment
              </Typography>
            </Paper>
          </GridWrapper>
        </GridWrapper>
      </CardContent>
    </Card>
  );

  // Feature 6: Customer Retention Roadmap
  const renderCustomerRetentionRoadmap = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="🤝 6. Customer Retention Roadmap"
        subheader="Reduce churn and increase customer lifetime value"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Retention Strategies
        </Typography>
        <Stepper orientation="vertical">
          <Step active>
            <StepLabel>Identify At-Risk Customers</StepLabel>
            <StepContent>
              <Typography>Use AI to predict churn risk</Typography>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>Personalized Retention Campaigns</StepLabel>
            <StepContent>
              <Typography>Targeted offers and communications</Typography>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>Loyalty Program Optimization</StepLabel>
            <StepContent>
              <Typography>Enhance loyalty program effectiveness</Typography>
            </StepContent>
          </Step>
        </Stepper>
      </CardContent>
    </Card>
  );

  // Feature 7: Logistics & Returns Optimization
  const renderLogisticsReturnsRoadmap = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="🚚 7. Logistics & Returns Optimization"
        subheader="Streamline shipping and reduce return rates"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Logistics Improvement Plan
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon><LocalShipping color="primary" /></ListItemIcon>
            <ListItemText primary="Shipping cost optimization" secondary="Reduce shipping costs by 15%" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Refresh color="primary" /></ListItemIcon>
            <ListItemText primary="Returns process automation" secondary="Streamline returns by 40%" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Inventory2 color="primary" /></ListItemIcon>
            <ListItemText primary="Inventory optimization" secondary="Improve stock accuracy by 25%" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );

  // Feature 8: SEO & Content Strategy
  const renderSEORoadmap = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="🔍 8. SEO & Content Strategy"
        subheader="Organic growth through content and search optimization"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          SEO Optimization Timeline
        </Typography>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary"><Search /></TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">Technical SEO Audit</Typography>
                <Typography>Fix crawl errors and improve site speed</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary"><Edit /></TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">Content Creation</Typography>
                <Typography>Create SEO-optimized product content</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  );

  // Feature 9: Conversion Funnel Optimization
  const renderConversionFunnelRoadmap = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="📊 9. Conversion Funnel Optimization"
        subheader="Identify and fix conversion bottlenecks"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Funnel Analysis & Optimization
        </Typography>
        <GridWrapper container spacing={2}>
          {[
            { stage: 'Awareness', conversion: 45, target: 60 },
            { stage: 'Consideration', conversion: 32, target: 45 },
            { stage: 'Conversion', conversion: 3.2, target: 4.5 },
            { stage: 'Retention', conversion: 35, target: 50 },
          ].map((item, index) => (
            <GridWrapper item xs={12} sm={6} md={3} key={index}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle2">{item.stage}</Typography>
                <Typography variant="h4" color="primary">{item.conversion}%</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(item.conversion / item.target) * 100}
                  sx={{ mt: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  Target: {item.target}%
                </Typography>
              </Paper>
            </GridWrapper>
          ))}
        </GridWrapper>
      </CardContent>
    </Card>
  );

  // Feature 10: Competitor Benchmarking
  const renderCompetitorBenchmarkRoadmap = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="🏆 10. Competitor Benchmark Analysis"
        subheader="Track competitor performance and identify opportunities"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Competitive Analysis
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Competitor</TableCell>
                <TableCell align="right">Market Share</TableCell>
                <TableCell align="right">Growth Rate</TableCell>
                <TableCell align="right">Price Index</TableCell>
                <TableCell align="right">Review Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { name: 'Competitor A', share: 25, growth: 12, price: 1.2, reviews: 4.5 },
                { name: 'Competitor B', share: 18, growth: 8, price: 1.0, reviews: 4.3 },
                { name: 'Competitor C', share: 15, growth: 15, price: 0.9, reviews: 4.1 },
                { name: 'Competitor D', share: 12, growth: 5, price: 1.1, reviews: 4.0 },
              ].map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.share}%</TableCell>
                  <TableCell align="right">{row.growth}%</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.reviews}/5</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  // Feature 11: Risk Mitigation
  const renderRiskMitigationRoadmap = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="⚠️ 11. Risk Mitigation Strategy"
        subheader="Identify and mitigate business risks proactively"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Risk Assessment Matrix
        </Typography>
        <GridWrapper container spacing={2}>
          {[
            { risk: 'Supply Chain Disruption', probability: 30, impact: 80, mitigation: 'Diversify suppliers' },
            { risk: 'Seasonal Demand Fluctuation', probability: 60, impact: 50, mitigation: 'Dynamic inventory' },
            { risk: 'Competitive Price War', probability: 40, impact: 70, mitigation: 'Value differentiation' },
            { risk: 'Technology Outage', probability: 20, impact: 90, mitigation: 'Redundant systems' },
          ].map((item, index) => (
            <GridWrapper item xs={12} md={6} key={index}>
              <Paper sx={{ p: 2, borderLeft: `4px solid ${item.probability * item.impact > 3000 ? 'error.main' : 'warning.main'}` }}>
                <Typography variant="subtitle2">{item.risk}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Chip label={`Probability: ${item.probability}%`} size="small" />
                  <Chip label={`Impact: ${item.impact}%`} size="small" />
                </Box>
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  Mitigation: {item.mitigation}
                </Typography>
              </Paper>
            </GridWrapper>
          ))}
        </GridWrapper>
      </CardContent>
    </Card>
  );

  // Feature 14: Multi-Team Strategy Orchestration
  const renderMultiTeamStrategy = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="👥 14. Multi-Team Strategy Orchestration"
        subheader="Coordinate efforts across all departments"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Team Collaboration Dashboard
        </Typography>
        <GridWrapper container spacing={2}>
          {teams.map((team, index) => (
            <GridWrapper item xs={12} sm={6} md={4} key={index}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Avatar sx={{ 
                  bgcolor: ['primary.main', 'secondary.main', 'success.main', 'warning.main', 'info.main', 'error.main'][index],
                  mx: 'auto',
                  mb: 1
                }}>
                  {team[0]}
                </Avatar>
                <Typography variant="subtitle1">{team}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {index + 3} active initiatives
                </Typography>
              </Paper>
            </GridWrapper>
          ))}
        </GridWrapper>
      </CardContent>
    </Card>
  );

  // Feature 15: Milestone & KPI Generator
  const renderMilestoneKpiGenerator = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="🎯 15. Milestone & KPI Generator"
        subheader="Automated milestone tracking and KPI monitoring"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Key Milestones Timeline
        </Typography>
        <Timeline>
          {[
            { milestone: 'Q1 Planning Complete', date: 'Jan 15', status: 'completed' },
            { milestone: 'Technical Infrastructure', date: 'Feb 28', status: 'in-progress' },
            { milestone: 'Marketing Campaign Launch', date: 'Mar 15', status: 'planned' },
            { milestone: 'Q1 Review & Optimization', date: 'Apr 10', status: 'planned' },
          ].map((item, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color={item.status === 'completed' ? 'success' : item.status === 'in-progress' ? 'warning' : 'info'}>
                  {item.status === 'completed' ? <CheckCircle /> : <CalendarToday />}
                </TimelineDot>
                {index < 3 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1">{item.milestone}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Target: {item.date}
                  </Typography>
                  <Chip 
                    label={item.status} 
                    size="small" 
                    color={item.status === 'completed' ? 'success' : item.status === 'in-progress' ? 'warning' : 'info'}
                    sx={{ mt: 1 }}
                  />
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );

  // Feature 16: Cross-Function Priority Matrix
  const renderCrossFunctionPriority = () => (
    <Card sx={{ mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <CardHeader
        title="🧩 16. Cross-Function Priority Matrix"
        subheader="AI-powered task prioritization across teams"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      />
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Priority Matrix Visualization
        </Typography>
        <Box sx={{ 
          position: 'relative', 
          height: 300, 
          bgcolor: 'background.default',
          borderRadius: 1,
          p: 2
        }}>
          <Typography align="center" color="text.secondary">
            Visual priority matrix would appear here
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  // ==================== HELPER FUNCTIONS ====================
  const calculateHealthScore = () => {
    const metrics = Object.values(businessHealth);
    const weights = [0.1, 0.15, 0.2, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0.05];
    return Math.round(metrics.reduce((acc, val, idx) => {
      const normalized = idx <= 6 ? (val / 100) * 100 : val;
      return acc + (normalized * weights[idx]);
    }, 0));
  };

  const generateRoadmap = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      // In real implementation, this would call an AI API
    }, 2000);
  };

  const exportRoadmap = (format: 'pdf' | 'excel' | 'json') => {
    setExportDialog(true);
    // Export logic here
  };

  // ==================== MAIN RENDER ====================
  return (
    <Container maxWidth="xl" sx={{ py: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Paper sx={{ 
        p: 4, 
        mb: 3, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 2,
        boxShadow: 3
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
              🚀 Ecommerce Growth Roadmap Generator
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2 }}>
              AI-powered strategic roadmap with 16 advanced features
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="16 Advanced Features" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }} />
              <Chip label="Multi-Team Orchestration" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }} />
              <Chip label="AI-Powered Projections" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }} />
              <Chip label="Real-time Analytics" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }} />
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={() => setExportDialog(true)}
            sx={{ 
              bgcolor: 'white', 
              color: '#667eea', 
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              borderRadius: 2
            }}
          >
            Export Roadmap
          </Button>
        </Box>
      </Paper>

      {/* Controls */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <GridWrapper container spacing={2} alignItems="center">
          <GridWrapper item xs={12} md={4}>
            <Button
              variant="contained"
              startIcon={generating ? <CircularProgress size={20} color="inherit" /> : <AutoGraph />}
              onClick={generateRoadmap}
              disabled={generating}
              fullWidth
              size="large"
            >
              {generating ? 'Generating AI Roadmap...' : 'Generate AI Roadmap'}
            </Button>
          </GridWrapper>
          <GridWrapper item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>View By Team</InputLabel>
              <Select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                label="View By Team"
              >
                <MenuItem value="all">All Teams</MenuItem>
                {teams.map(team => (
                  <MenuItem key={team} value={team}>{team}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridWrapper>
          <GridWrapper item xs={12} md={4}>
            <ToggleButtonGroup
              value={roadmapView}
              exclusive
              onChange={(e, value) => value && setRoadmapView(value)}
              fullWidth
              size="large"
            >
              <ToggleButton value="timeline">
                <TimelineIcon sx={{ mr: 1 }} />
                Timeline
              </ToggleButton>
              <ToggleButton value="matrix">
                <GridView sx={{ mr: 1 }} />
                Matrix
              </ToggleButton>
              <ToggleButton value="list">
                <TableView sx={{ mr: 1 }} />
                List
              </ToggleButton>
            </ToggleButtonGroup>
          </GridWrapper>
        </GridWrapper>
      </Paper>

      {/* Tabs */}
      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider', 
        mb: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        px: 2
      }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)} 
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          <TabComponent icon={<Dashboard />} label="Dashboard" />
          <Tab icon={<Analytics />} label="Business Health" />
          <Tab icon={<Category />} label="Catalog Roadmap" />
          <Tab icon={<Search />} label="Search & Discovery" />
          <Tab icon={<Psychology />} label="AI Personalization" />
          <Tab icon={<AttachMoney />} label="Pricing & Revenue" />
          <Tab icon={<Person />} label="Customer Retention" />
          <Tab icon={<LocalShipping />} label="Logistics & Returns" />
          <Tab icon={<Public />} label="SEO & Content" />
          <Tab icon={<TrendingUp />} label="Conversion Funnel" />
          <Tab icon={<CompareArrows />} label="Competitor Benchmark" />
          <Tab icon={<Warning />} label="Risk Mitigation" />
          <Tab icon={<CalendarToday />} label="Timeline" />
          <Tab icon={<Insights />} label="Impact Projection" />
          <Tab icon={<AccountTree />} label="Multi-Team" />
          <Tab icon={<Lightbulb />} label="Priority Matrix" />
        </Tabs>
      </Box>

      {/* Content */}
      <Box sx={{ mt: 2 }}>
        {activeTab === 0 && (
          <>
            {renderBusinessHealthAnalyzer()}
            {renderCatalogRoadmap()}
            {renderSearchDiscoveryRoadmap()}
            {renderAIPersonalizationRoadmap()}
            {renderPricingRevenueRoadmap()}
            {renderCustomerRetentionRoadmap()}
            {renderLogisticsReturnsRoadmap()}
            {renderSEORoadmap()}
            {renderConversionFunnelRoadmap()}
            {renderCompetitorBenchmarkRoadmap()}
            {renderRiskMitigationRoadmap()}
            {renderTimelineRoadmap()}
            {renderAIImpactProjection()}
            {renderMultiTeamStrategy()}
            {renderMilestoneKpiGenerator()}
            {renderCrossFunctionPriority()}
          </>
        )}
        {activeTab === 1 && renderBusinessHealthAnalyzer()}
        {activeTab === 2 && renderCatalogRoadmap()}
        {activeTab === 3 && renderSearchDiscoveryRoadmap()}
        {activeTab === 4 && renderAIPersonalizationRoadmap()}
        {activeTab === 5 && renderPricingRevenueRoadmap()}
        {activeTab === 6 && renderCustomerRetentionRoadmap()}
        {activeTab === 7 && renderLogisticsReturnsRoadmap()}
        {activeTab === 8 && renderSEORoadmap()}
        {activeTab === 9 && renderConversionFunnelRoadmap()}
        {activeTab === 10 && renderCompetitorBenchmarkRoadmap()}
        {activeTab === 11 && renderRiskMitigationRoadmap()}
        {activeTab === 12 && renderTimelineRoadmap()}
        {activeTab === 13 && renderAIImpactProjection()}
        {activeTab === 14 && renderMultiTeamStrategy()}
        {activeTab === 15 && renderCrossFunctionPriority()}
      </Box>

      {/* Export Dialog */}
      <Dialog open={exportDialog} onClose={() => setExportDialog(false)}>
        <DialogTitle>Export Roadmap</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>Choose export format:</Typography>
          <GridWrapper container spacing={2}>
            <GridWrapper item xs={4}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => exportRoadmap('pdf')}
                startIcon={<PictureAsPdf />}
              >
                PDF
              </Button>
            </GridWrapper>
            <GridWrapper item xs={4}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => exportRoadmap('excel')}
                startIcon={<TableView />}
              >
                Excel
              </Button>
            </GridWrapper>
            <GridWrapper item xs={4}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => exportRoadmap('json')}
                startIcon={<DataObject />}
              >
                JSON
              </Button>
            </GridWrapper>
          </GridWrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setExportDialog(false)}>Export</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EcommerceGrowthRoadmap;



