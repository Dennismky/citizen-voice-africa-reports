import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Eye, Filter } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

// Mock data for demonstration
const mockReports = [
  {
    id: "1",
    title: "Fraudulent Construction Contract",
    description: "Contractor awarded project without proper bidding process",
    type: "red-flag",
    status: "pending",
    location: "Nairobi, Kenya",
    createdAt: "2024-01-15",
    submittedBy: "John Doe",
    assignedTo: "Admin Team",
  },
  {
    id: "2",
    title: "Health Center Equipment Missing",
    description: "Medical equipment purchased but not delivered to health center",
    type: "intervention",
    status: "investigating",
    location: "Mombasa, Kenya",
    createdAt: "2024-01-10",
    submittedBy: "Mary Smith",
    assignedTo: "Field Team A",
  },
  {
    id: "3",
    title: "Road Construction Delays",
    description: "Road project behind schedule with no explanation",
    type: "red-flag",
    status: "resolved",
    location: "Kisumu, Kenya",
    createdAt: "2024-01-05",
    submittedBy: "Peter Wilson",
    assignedTo: "Engineering Team",
  },
];

const AdminDashboard = () => {
  const [reports, setReports] = useState(mockReports);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredReports = reports.filter(report => 
    filterStatus === "all" || report.status === filterStatus
  );

  const handleStatusChange = (reportId: string, newStatus: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
  };

  const handleAddReport = (formData: any) => {
    const newReport = {
      id: String(reports.length + 1),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      submittedBy: "Admin",
      assignedTo: "Admin Team",
    };
    setReports(prev => [...prev, newReport]);
    setShowAddDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/80">Manage all corruption reports and interventions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{reports.length}</div>
                <div className="text-white/80">Total Reports</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {reports.filter(r => r.status === "pending").length}
                </div>
                <div className="text-white/80">Pending</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {reports.filter(r => r.status === "investigating").length}
                </div>
                <div className="text-white/80">Investigating</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {reports.filter(r => r.status === "resolved").length}
                </div>
                <div className="text-white/80">Resolved</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <Filter className="h-5 w-5 text-white" />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reports</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add New Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Report</DialogTitle>
                  </DialogHeader>
                  <AddReportForm onSubmit={handleAddReport} />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Reports Table */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">All Reports ({filteredReports.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20">
                    <TableHead className="text-white/80">Title</TableHead>
                    <TableHead className="text-white/80">Type</TableHead>
                    <TableHead className="text-white/80">Status</TableHead>
                    <TableHead className="text-white/80">Location</TableHead>
                    <TableHead className="text-white/80">Date</TableHead>
                    <TableHead className="text-white/80">Submitted By</TableHead>
                    <TableHead className="text-white/80">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id} className="border-white/20">
                      <TableCell className="text-white font-medium">
                        {report.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant={report.type === "red-flag" ? "destructive" : "secondary"}>
                          {report.type === "red-flag" ? "Red Flag" : "Intervention"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={report.status as any} />
                      </TableCell>
                      <TableCell className="text-white/80">{report.location}</TableCell>
                      <TableCell className="text-white/80">{report.createdAt}</TableCell>
                      <TableCell className="text-white/80">{report.submittedBy}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedReport(report)}
                            className="text-white hover:bg-white/10"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Select onValueChange={(value) => handleStatusChange(report.id, value)}>
                            <SelectTrigger className="w-32 h-8 bg-white/10 border-white/20 text-white text-xs">
                              <Edit className="h-3 w-3" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="investigating">Investigating</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Report Details Dialog */}
        {selectedReport && (
          <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedReport.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Description</Label>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedReport.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Location</Label>
                    <p className="mt-1 text-sm">{selectedReport.location}</p>
                  </div>
                  <div>
                    <Label>Date Submitted</Label>
                    <p className="mt-1 text-sm">{selectedReport.createdAt}</p>
                  </div>
                  <div>
                    <Label>Submitted By</Label>
                    <p className="mt-1 text-sm">{selectedReport.submittedBy}</p>
                  </div>
                  <div>
                    <Label>Assigned To</Label>
                    <p className="mt-1 text-sm">{selectedReport.assignedTo}</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

const AddReportForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    status: "pending",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      type: "",
      status: "pending",
      location: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter report title"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter detailed description"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Type</Label>
          <Select onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="red-flag">Red Flag</SelectItem>
              <SelectItem value="intervention">Intervention</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Enter location"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit">Add Report</Button>
      </div>
    </form>
  );
};

export default AdminDashboard;